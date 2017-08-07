package fi.helsinki.cs.joosakur.asmgr.entity;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.Email;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.*;

@Entity
@Table(
        name = "employers",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email")
        },
        indexes = {
                @Index(name = "idx_employer_1", columnList = "id", unique = true),
                @Index(name = "idx_employer_2", columnList = "email", unique = true)
        }
)
public class Employer implements UserDetails {

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
    private LocalDate birthday;

    @OneToMany(mappedBy = "employer", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @NotNull
    private List<Assistant> assistants = new ArrayList<>();

    @Column(name = "enabled")
    @NotNull
    private boolean enabled;

    public Employer() {
    }

    public Employer(String email, String password, String firstName, String lastName, LocalDate birthday) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
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

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public List<Assistant> getAssistants() {
        return assistants;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorityList = AuthorityUtils.createAuthorityList("ROLE_EMPLOYER");
        return authorityList;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }


}
