package fi.helsinki.cs.joosakur.asmgr.rest.model.employer;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

/**
 * EmployerPut
 */
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2017-07-11T14:35:13.497Z")

public class EmployerPut {
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

