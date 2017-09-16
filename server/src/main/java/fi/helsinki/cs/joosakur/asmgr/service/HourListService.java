package fi.helsinki.cs.joosakur.asmgr.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import fi.helsinki.cs.joosakur.asmgr.config.properties.AppConfig;
import fi.helsinki.cs.joosakur.asmgr.entity.Export;
import fi.helsinki.cs.joosakur.asmgr.sheet.HourList;
import fi.helsinki.cs.joosakur.asmgr.sheet.HourListBuilder;
import org.joda.time.DateTime;
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
public class HourListService {

    @Autowired
    private HourListBuilder hourListBuilder;

    @Autowired
    private AmazonS3 amazonS3;

    @Autowired
    private AppConfig appConfig;

    @Async
    public CompletableFuture<String> handleExport(Export export) throws IOException {
        System.out.println("handling export");
        HourList build = hourListBuilder.build(export.getEmployer(), export.getAssistant(),
                export.getFrom(), export.getTo());
        System.out.println("hourlist built");
        File file = build.saveAs("/asmgr/" + export.getId() + ".ods");
        System.out.println("tempfile saved");

        String filename = new StringJoiner(" ", "", ".ods")
                .add(export.getTo().format(DateTimeFormatter.ofPattern("yy-MM")))
                .add(export.getAssistant().getFirstName())
                .add(export.getAssistant().getLastName())
                .toString();
        String key = "hour-lists/"+export.getAssistant().getId()+"/"+filename;
        String bucketName = appConfig.getS3().getBucket();
        System.out.println("putting to bucket");
        try {
            amazonS3.putObject(bucketName, key, file);
            System.out.println("file uploaded");
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            throw e;
        }
        finally {
            file.delete();
            System.out.println("tempfile deleted");

        }

        Date expiration = DateTime.now().plusMinutes(1).toDate();
        System.out.println("generating url");
        try {
            URL url = amazonS3.generatePresignedUrl(bucketName, key, expiration, HttpMethod.GET);
            System.out.println(url.toString());
            return CompletableFuture.completedFuture(url.toString());
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            throw e;
        }

    }
}
