package fi.helsinki.cs.joosakur.asmgr.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EntityScan(basePackages = {"fi.helsinki.cs.joosakur.asmgr.entity"})
@EnableJpaRepositories(basePackages = {"fi.helsinki.cs.joosakur.asmgr.repository"})
public class DBConfig {

}
