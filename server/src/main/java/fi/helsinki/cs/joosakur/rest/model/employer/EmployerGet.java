package fi.helsinki.cs.joosakur.rest.model.employer;

import fi.helsinki.cs.joosakur.entity.Employer;

import java.util.Date;

public class EmployerGet {

    public EmployerGet() {
    }

    public EmployerGet(Employer employer) {
        this.id = employer.getId().toString();
        this.email = employer.getEmail();
        this.firstName = employer.getFirstName();
        this.lastName = employer.getLastName();
        this.birthday = employer.getBirthday();
    }

    private String id;

    private String email;

    private String firstName;

    private String lastName;

    private Date birthday;

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }
}
