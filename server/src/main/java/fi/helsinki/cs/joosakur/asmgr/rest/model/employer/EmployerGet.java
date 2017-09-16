package fi.helsinki.cs.joosakur.asmgr.rest.model.employer;

import com.fasterxml.jackson.annotation.JsonProperty;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;

import java.time.format.DateTimeFormatter;
import java.util.UUID;

/**
 * EmployerGet
 */
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2017-07-11T14:35:13.497Z")

public class EmployerGet {
    @JsonProperty("id")
    private UUID id = null;

    @JsonProperty("email")
    private String email = null;

    @JsonProperty("firstName")
    private String firstName = null;

    @JsonProperty("lastName")
    private String lastName = null;

    @JsonProperty("birthday")
    private String birthday = null;

    @JsonProperty("hetaMember")
    private boolean hetaMember;

    @JsonProperty("city")
    private String city;

    public EmployerGet fromEntity(Employer employer){
        this.id = employer.getId();
        this.email = employer.getEmail();
        this.firstName = employer.getFirstName();
        this.lastName = employer.getLastName();
        this.birthday = employer.getBirthday().format(DateTimeFormatter.ISO_DATE);
        this.hetaMember = employer.isHetaMember();
        this.city = employer.getCity();
        return this;
    }


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
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

