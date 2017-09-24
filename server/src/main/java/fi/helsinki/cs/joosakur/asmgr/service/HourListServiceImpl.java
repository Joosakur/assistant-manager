package fi.helsinki.cs.joosakur.asmgr.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import fi.helsinki.cs.joosakur.asmgr.config.properties.AppConfig;
import fi.helsinki.cs.joosakur.asmgr.entity.Export;
import fi.helsinki.cs.joosakur.asmgr.sheet.HourList;
import fi.helsinki.cs.joosakur.asmgr.sheet.HourListBuilder;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.StringJoiner;
import java.util.concurrent.CompletableFuture;

@Service
public class HourListServiceImpl implements HourListService {

    private static final Logger logger = LoggerFactory.getLogger(HourListServiceImpl.class);
    public static final int PRESIGNED_DOWNLOAD_EXPIRATION_MINUTES = 10;

    @Autowired
    private HourListBuilder hourListBuilder;

    @Autowired
    private AmazonS3 amazonS3;

    @Autowired
    private AppConfig appConfig;

    @Override
    @Async
    public CompletableFuture<String> handleExport(Export export) throws IOException {
        logger.debug("Handling export {}", export.getId());

        HourList build = hourListBuilder.build(export.getEmployer(), export.getAssistant(),
                export.getFrom(), export.getTo());
        logger.trace("Hour list built");

        String tempFileName = "/asmgr/" + export.getId() + ".ods";
        File file = build.saveAs(tempFileName);
        logger.trace("Temp file saved");

        String filename = new StringJoiner(" ", "", ".ods")
                .add(export.getTo().format(DateTimeFormatter.ofPattern("yy-MM")))
                .add(export.getAssistant().getFirstName())
                .add(export.getAssistant().getLastName())
                .toString();
        String key = "hour-lists/"+export.getAssistant().getId()+"/"+filename;
        String bucketName = appConfig.getS3().getBucket();

        try {
            amazonS3.putObject(bucketName, key, file);
            logger.debug("File uploaded to S3 with key {}", key);
        }
        finally {
            boolean success = file.delete();
            if(success)
                logger.trace("Temp file deleted");
            else
                logger.warn("Could not delete temp file {}", tempFileName);
        }

        Date expiration = DateTime.now().plusMinutes(PRESIGNED_DOWNLOAD_EXPIRATION_MINUTES).toDate();

        URL url = amazonS3.generatePresignedUrl(bucketName, key, expiration, HttpMethod.GET);
        logger.debug("Generated a presigned url to download export {}", export.getId());

        return CompletableFuture.completedFuture(url.toString());
    }
}
