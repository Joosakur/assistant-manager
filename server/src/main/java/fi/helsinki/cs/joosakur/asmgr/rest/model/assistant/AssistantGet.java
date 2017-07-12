package fi.helsinki.cs.joosakur.asmgr.rest.model.assistant;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import org.joda.time.LocalDate;

import java.util.Objects;
import java.util.UUID;

/**
 * AssistantGet
 */
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2017-07-11T14:35:13.497Z")

public class AssistantGet {
    @JsonProperty("id")
    private UUID id = null;

    @JsonProperty("emploerId")
    private UUID emploerId = null;

    @JsonProperty("email")
    private String email = null;

    @JsonProperty("firstName")
    private String firstName = null;

    @JsonProperty("lastName")
    private String lastName = null;

    @JsonProperty("nickName")
    private String nickName = null;

    @JsonProperty("birthday")
    private LocalDate birthday = null;

    @JsonProperty("active")
    private Boolean active = null;

    @JsonProperty("backgroundColor")
    private String backgroundColor = null;

    @JsonProperty("textColor")
    private String textColor = null;

    @JsonProperty("exportedUntil")
    private LocalDate exportedUntil = null;

    public AssistantGet id(UUID id) {
        this.id = id;
        return this;
    }

    /**
     * Get id
     *
     * @return id
     **/
    @ApiModelProperty(value = "")
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public AssistantGet emploerId(UUID emploerId) {
        this.emploerId = emploerId;
        return this;
    }

    /**
     * Get emploerId
     *
     * @return emploerId
     **/
    @ApiModelProperty(value = "")
    public UUID getEmploerId() {
        return emploerId;
    }

    public void setEmploerId(UUID emploerId) {
        this.emploerId = emploerId;
    }

    public AssistantGet email(String email) {
        this.email = email;
        return this;
    }

    /**
     * Get email
     *
     * @return email
     **/
    @ApiModelProperty(value = "")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public AssistantGet firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    /**
     * Get firstName
     *
     * @return firstName
     **/
    @ApiModelProperty(value = "")
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public AssistantGet lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    /**
     * Get lastName
     *
     * @return lastName
     **/
    @ApiModelProperty(value = "")
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public AssistantGet nickName(String nickName) {
        this.nickName = nickName;
        return this;
    }

    /**
     * Get nickName
     *
     * @return nickName
     **/
    @ApiModelProperty(value = "")
    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public AssistantGet birthday(LocalDate birthday) {
        this.birthday = birthday;
        return this;
    }

    /**
     * Get birthday
     *
     * @return birthday
     **/
    @ApiModelProperty(value = "")
    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public AssistantGet active(Boolean active) {
        this.active = active;
        return this;
    }

    /**
     * Get active
     *
     * @return active
     **/
    @ApiModelProperty(value = "")
    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public AssistantGet backgroundColor(String backgroundColor) {
        this.backgroundColor = backgroundColor;
        return this;
    }

    /**
     * Get backgroundColor
     *
     * @return backgroundColor
     **/
    @ApiModelProperty(value = "")
    public String getBackgroundColor() {
        return backgroundColor;
    }

    public void setBackgroundColor(String backgroundColor) {
        this.backgroundColor = backgroundColor;
    }

    public AssistantGet textColor(String textColor) {
        this.textColor = textColor;
        return this;
    }

    /**
     * Get textColor
     *
     * @return textColor
     **/
    @ApiModelProperty(value = "")
    public String getTextColor() {
        return textColor;
    }

    public void setTextColor(String textColor) {
        this.textColor = textColor;
    }

    public AssistantGet exportedUntil(LocalDate exportedUntil) {
        this.exportedUntil = exportedUntil;
        return this;
    }

    /**
     * Get exportedUntil
     *
     * @return exportedUntil
     **/
    @ApiModelProperty(value = "")
    public LocalDate getExportedUntil() {
        return exportedUntil;
    }

    public void setExportedUntil(LocalDate exportedUntil) {
        this.exportedUntil = exportedUntil;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AssistantGet assistantGet = (AssistantGet) o;
        return Objects.equals(this.id, assistantGet.id) &&
                Objects.equals(this.emploerId, assistantGet.emploerId) &&
                Objects.equals(this.email, assistantGet.email) &&
                Objects.equals(this.firstName, assistantGet.firstName) &&
                Objects.equals(this.lastName, assistantGet.lastName) &&
                Objects.equals(this.nickName, assistantGet.nickName) &&
                Objects.equals(this.birthday, assistantGet.birthday) &&
                Objects.equals(this.active, assistantGet.active) &&
                Objects.equals(this.backgroundColor, assistantGet.backgroundColor) &&
                Objects.equals(this.textColor, assistantGet.textColor) &&
                Objects.equals(this.exportedUntil, assistantGet.exportedUntil);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, emploerId, email, firstName, lastName, nickName, birthday, active, backgroundColor, textColor, exportedUntil);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class AssistantGet {\n");

        sb.append("    id: ").append(toIndentedString(id)).append("\n");
        sb.append("    emploerId: ").append(toIndentedString(emploerId)).append("\n");
        sb.append("    email: ").append(toIndentedString(email)).append("\n");
        sb.append("    firstName: ").append(toIndentedString(firstName)).append("\n");
        sb.append("    lastName: ").append(toIndentedString(lastName)).append("\n");
        sb.append("    nickName: ").append(toIndentedString(nickName)).append("\n");
        sb.append("    birthday: ").append(toIndentedString(birthday)).append("\n");
        sb.append("    active: ").append(toIndentedString(active)).append("\n");
        sb.append("    backgroundColor: ").append(toIndentedString(backgroundColor)).append("\n");
        sb.append("    textColor: ").append(toIndentedString(textColor)).append("\n");
        sb.append("    exportedUntil: ").append(toIndentedString(exportedUntil)).append("\n");
        sb.append("}");
        return sb.toString();
    }

    /**
     * Convert the given object to string with each line indented by 4 spaces
     * (except the first line).
     */
    private String toIndentedString(Object o) {
        if (o == null) {
            return "null";
        }
        return o.toString().replace("\n", "\n    ");
    }
}

