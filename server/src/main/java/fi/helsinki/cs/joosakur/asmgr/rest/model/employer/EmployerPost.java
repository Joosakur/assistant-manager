package fi.helsinki.cs.joosakur.asmgr.rest.model.employer;

import com.fasterxml.jackson.annotation.JsonProperty;
import fi.helsinki.cs.joosakur.asmgr.validation.patterns.Patterns;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;

/**
 * EmployerPost
 */
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2017-07-11T14:35:13.497Z")

public class EmployerPost {
    @JsonProperty("email")
    @NotNull
    @Size(min = 3, max = 60)
    @Pattern(regexp = Patterns.EMAIL)
    private String email = null;

    @JsonProperty("password")
    @NotNull
    @Size(min = 8, max = 30)
    private String password = null;

    @JsonProperty("firstName")
    @NotNull
    @Size(min = 1, max = 20)
    private String firstName = null;

    @JsonProperty("lastName")
    @NotNull
    @Size(min = 1, max = 30)
    private String lastName = null;

    @JsonProperty("birthday")
    @NotNull
    private LocalDate birthday = null;

    @JsonProperty("hetaMember")
    private boolean hetaMember;

    @JsonProperty("city")
    @NotNull
    @Size(min = 1, max = 36)
    private String city;

    @JsonProperty("captcha")
    private String captcha = null;


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getCaptcha() {
        return captcha;
    }

    public void setCaptcha(String captcha) {
        this.captcha = captcha;
    }

    public boolean isHetaMember() {
        return hetaMember;
    }

    public void setHetaMember(boolean hetaMember) {
        this.hetaMember = hetaMember;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}

