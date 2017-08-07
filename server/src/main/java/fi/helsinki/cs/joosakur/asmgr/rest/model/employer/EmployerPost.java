package fi.helsinki.cs.joosakur.asmgr.rest.model.employer;

import com.fasterxml.jackson.annotation.JsonProperty;
import fi.helsinki.cs.joosakur.asmgr.validation.patterns.Patterns;
import io.swagger.annotations.ApiModelProperty;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.Objects;

/**
 * EmployerPost
 */
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2017-07-11T14:35:13.497Z")

public class EmployerPost {
    @JsonProperty("email")
    private String email = null;

    @JsonProperty("password")
    private String password = null;

    @JsonProperty("firstName")
    private String firstName = null;

    @JsonProperty("lastName")
    private String lastName = null;

    @JsonProperty("birthday")
    private LocalDate birthday = null;

    @JsonProperty("captcha")
    private String captcha = null;

    /**
     * Get email
     *
     * @return email
     **/
    @ApiModelProperty(required = true, value = "")
    @NotNull
    @Size(min = 3, max = 60)
    @Pattern(regexp = Patterns.EMAIL)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Get password
     *
     * @return password
     **/
    @ApiModelProperty(required = true, value = "")
    @NotNull
    @Size(min = 8, max = 30)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Get firstName
     *
     * @return firstName
     **/
    @ApiModelProperty(required = true, value = "")
    @NotNull
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
    @NotNull
    @Size(min = 1, max = 30)
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    /**
     * Get birthday
     *
     * @return birthday
     **/
    @ApiModelProperty(required = true, value = "")
    @NotNull
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        EmployerPost employerPost = (EmployerPost) o;
        return Objects.equals(this.email, employerPost.email) &&
                Objects.equals(this.password, employerPost.password) &&
                Objects.equals(this.firstName, employerPost.firstName) &&
                Objects.equals(this.lastName, employerPost.lastName) &&
                Objects.equals(this.birthday, employerPost.birthday);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, password, firstName, lastName, birthday);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class EmployerPost {\n");

        sb.append("    email: ").append(toIndentedString(email)).append("\n");
        sb.append("    password: ").append(toIndentedString(password)).append("\n");
        sb.append("    firstName: ").append(toIndentedString(firstName)).append("\n");
        sb.append("    lastName: ").append(toIndentedString(lastName)).append("\n");
        sb.append("    birthday: ").append(toIndentedString(birthday)).append("\n");
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

