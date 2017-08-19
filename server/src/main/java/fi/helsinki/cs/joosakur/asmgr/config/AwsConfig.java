package fi.helsinki.cs.joosakur.asmgr.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import fi.helsinki.cs.joosakur.asmgr.config.properties.AppConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsConfig {

    @Autowired
    private AppConfig appConfig;

    @Bean
    public AmazonS3 amazonS3() {
        final AppConfig.S3 s3Config = appConfig.getS3();

        return AmazonS3ClientBuilder.standard()
                .withRegion(s3Config.getRegion())
                .withCredentials(
                        new AWSStaticCredentialsProvider(
                                new BasicAWSCredentials(
                                        s3Config.getAccessKey(),
                                        s3Config.getSecretKey()
                                )
                        )
                )
                .build();
    }

}
