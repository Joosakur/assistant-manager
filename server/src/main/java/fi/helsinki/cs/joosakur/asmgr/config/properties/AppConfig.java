package fi.helsinki.cs.joosakur.asmgr.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;
import org.springframework.context.annotation.Configuration;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Configuration
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    @NotNull
    private String apiOrigin;

    @NotNull
    private String guiOrigin;

    @NestedConfigurationProperty
    private Recaptcha recaptcha = new Recaptcha();

    @NestedConfigurationProperty
    private Jwt jwt = new Jwt();



    public String getApiOrigin() {
        return apiOrigin;
    }

    public String getGuiOrigin() {
        return guiOrigin;
    }

    public void setApiOrigin(String apiOrigin) {
        this.apiOrigin = apiOrigin;
    }

    public void setGuiOrigin(String guiOrigin) {
        this.guiOrigin = guiOrigin;
    }

    public Recaptcha getRecaptcha() {
        return recaptcha;
    }

    public void setRecaptcha(Recaptcha recaptcha) {
        this.recaptcha = recaptcha;
    }

    public Jwt getJwt() {
        return jwt;
    }

    public void setJwt(Jwt jwt) {
        this.jwt = jwt;
    }


    public class Recaptcha {

        @NotNull
        @Size(min = 10)
        private String secret;

        public String getSecret() {
            return secret;
        }

        public void setSecret(String secret) {
            this.secret = secret;
        }
    }

    public class Jwt {
        @NotNull
        private String header;

        @NotNull
        private String secret;

        @NotNull
        @Min(1)
        private int expiration;

        public String getHeader() {
            return header;
        }

        public void setHeader(String header) {
            this.header = header;
        }

        public String getSecret() {
            return secret;
        }

        public void setSecret(String secret) {
            this.secret = secret;
        }

        public int getExpiration() {
            return expiration;
        }

        public void setExpiration(int expiration) {
            this.expiration = expiration;
        }
    }

}
