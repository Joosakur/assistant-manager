package fi.helsinki.cs.joosakur.rest.model.assistant;

import fi.helsinki.cs.joosakur.entity.Assistant;

import java.util.Date;

public class AssistantGet {

    private String id;

    private String employerId;

    private String email;

    private String firstName;

    private String lastName;

    private String nickname;

    private Date birthday;

    private boolean active;

    public AssistantGet() {
    }

    public AssistantGet(Assistant assistant) {
        this.id = assistant.getId().toString();
        this.employerId = assistant.getEmployer().getId().toString();
        this.email = assistant.getEmail();
        this.firstName = assistant.getFirstName();
        this.lastName = assistant.getLastName();
        this.nickname = assistant.getNickname();
        this.birthday = assistant.getBirthday();
        this.active = assistant.isActive();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmployerId() {
        return employerId;
    }

    public void setEmployerId(String employerId) {
        this.employerId = employerId;
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

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
