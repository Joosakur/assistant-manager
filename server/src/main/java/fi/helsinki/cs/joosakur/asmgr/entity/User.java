package fi.helsinki.cs.joosakur.asmgr.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.Email;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "app_users")
public class User implements UserDetails{

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "UUID")
    private UUID id;

    @Column(name = "email", unique = true, nullable = false, length = 64)
    @NotNull
    @Size(min = 3, max = 64)
    @Email
    private String email;

    @Column(name = "password", nullable = false, length = 60)
    @Size(min = 60, max = 60)
    @NotNull
    private String password;

    @Column(name = "first_name", nullable = false, length = 20)
    @NotNull
    @Size(min = 1, max = 20)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 30)
    @NotNull
    @Size(min = 1, max = 30)
    private String lastName;

    @Column(name = "birthday")
    @NotNull
    private Date birthday;

    public User() {
    }

    public User(String email, String password, String firstName, String lastName, Date birthday) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
    }

    public UUID getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User employer = (User) o;

        if (id != null ? !id.equals(employer.id) : employer.id != null) return false;
        if (email != null ? !email.equals(employer.email) : employer.email != null) return false;
        if (firstName != null ? !firstName.equals(employer.firstName) : employer.firstName != null) return false;
        if (lastName != null ? !lastName.equals(employer.lastName) : employer.lastName != null) return false;
        return birthday != null ? birthday.equals(employer.birthday) : employer.birthday == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (firstName != null ? firstName.hashCode() : 0);
        result = 31 * result + (lastName != null ? lastName.hashCode() : 0);
        result = 31 * result + (birthday != null ? birthday.hashCode() : 0);
        return result;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.createAuthorityList();
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return email;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
