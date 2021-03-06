package fi.helsinki.cs.joosakur.asmgr.rest.model.assistant;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.Objects;

/**
 * AssistantPost
 */
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2017-07-11T14:35:13.497Z")

public class AssistantPost {
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

    /**
     * Get email
     *
     * @return email
     **/
    @ApiModelProperty(required = true, value = "")
    @Pattern(regexp = "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$", message = "Invalid email")
    @Size(min = 3, max = 60)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Get firstName
     *
     * @return firstName
     **/
    @ApiModelProperty(required = true, value = "")
    @NotNull()
    @Size(min = 1, max = 20)
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Get lastName
     *
     * @return lastName
     **/
    @ApiModelProperty(required = true, value = "")
    @NotNull()
    @Size(min = 1, max = 30)
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * Get nickName
     *
     * @return nickName
     **/
    @ApiModelProperty(value = "")
    @Size(min = 1, max = 12)
    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    /**
     * Get birthday
     *
     * @return birthday
     **/
    @ApiModelProperty(required = true, value = "")
    @NotNull()
    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    /**
     * Get active
     *
     * @return active
     **/
    @ApiModelProperty(required = true, value = "")
    @NotNull()
    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    /**
     * Get backgroundColor
     *
     * @return backgroundColor
     **/
    @ApiModelProperty(value = "")
    @NotNull()
    @Pattern(regexp = "#([0-9abcdef]{6})", message = "Invalid color, must be a hex code")
    public String getBackgroundColor() {
        return backgroundColor;
    }

    public void setBackgroundColor(String backgroundColor) {
        this.backgroundColor = backgroundColor;
    }


    /**
     * Get textColor
     *
     * @return textColor
     **/
    @ApiModelProperty(value = "")
    @NotNull()
    @Pattern(regexp = "#([0-9abcdef]{6})", message = "Invalid color, must be a hex code")
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
        AssistantPost assistantPost = (AssistantPost) o;
        return Objects.equals(this.email, assistantPost.email) &&
                Objects.equals(this.firstName, assistantPost.firstName) &&
                Objects.equals(this.lastName, assistantPost.lastName) &&
                Objects.equals(this.nickName, assistantPost.nickName) &&
                Objects.equals(this.birthday, assistantPost.birthday) &&
                Objects.equals(this.active, assistantPost.active) &&
                Objects.equals(this.backgroundColor, assistantPost.backgroundColor) &&
                Objects.equals(this.textColor, assistantPost.textColor);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, firstName, lastName, nickName, birthday, active, backgroundColor, textColor);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class AssistantPost {\n");

        sb.append("    email: ").append(toIndentedString(email)).append("\n");
        sb.append("    firstName: ").append(toIndentedString(firstName)).append("\n");
        sb.append("    lastName: ").append(toIndentedString(lastName)).append("\n");
        sb.append("    nickName: ").append(toIndentedString(nickName)).append("\n");
        sb.append("    birthday: ").append(toIndentedString(birthday)).append("\n");
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

