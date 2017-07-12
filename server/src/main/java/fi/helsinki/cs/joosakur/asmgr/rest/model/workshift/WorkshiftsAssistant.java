package fi.helsinki.cs.joosakur.asmgr.rest.model.workshift;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;

import java.util.Objects;
import java.util.UUID;

/**
 * WorkshiftsAssistant
 */
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2017-07-11T14:35:13.497Z")

public class WorkshiftsAssistant {
    @JsonProperty("id")
    private UUID id = null;

    @JsonProperty("firstName")
    private String firstName = null;

    @JsonProperty("lastName")
    private String lastName = null;

    @JsonProperty("nickName")
    private String nickName = null;

    @JsonProperty("active")
    private Boolean active = null;

    @JsonProperty("backgroundColor")
    private String backgroundColor = null;

    @JsonProperty("textColor")
    private String textColor = null;

    public WorkshiftsAssistant id(UUID id) {
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

    public WorkshiftsAssistant firstName(String firstName) {
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

    public WorkshiftsAssistant lastName(String lastName) {
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

    public WorkshiftsAssistant nickName(String nickName) {
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

    public WorkshiftsAssistant active(Boolean active) {
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

    public WorkshiftsAssistant backgroundColor(String backgroundColor) {
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

    public WorkshiftsAssistant textColor(String textColor) {
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


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        WorkshiftsAssistant workshiftsAssistant = (WorkshiftsAssistant) o;
        return Objects.equals(this.id, workshiftsAssistant.id) &&
                Objects.equals(this.firstName, workshiftsAssistant.firstName) &&
                Objects.equals(this.lastName, workshiftsAssistant.lastName) &&
                Objects.equals(this.nickName, workshiftsAssistant.nickName) &&
                Objects.equals(this.active, workshiftsAssistant.active) &&
                Objects.equals(this.backgroundColor, workshiftsAssistant.backgroundColor) &&
                Objects.equals(this.textColor, workshiftsAssistant.textColor);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, nickName, active, backgroundColor, textColor);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class WorkshiftsAssistant {\n");

        sb.append("    id: ").append(toIndentedString(id)).append("\n");
        sb.append("    firstName: ").append(toIndentedString(firstName)).append("\n");
        sb.append("    lastName: ").append(toIndentedString(lastName)).append("\n");
        sb.append("    nickName: ").append(toIndentedString(nickName)).append("\n");
        sb.append("    active: ").append(toIndentedString(active)).append("\n");
        sb.append("    backgroundColor: ").append(toIndentedString(backgroundColor)).append("\n");
        sb.append("    textColor: ").append(toIndentedString(textColor)).append("\n");
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

