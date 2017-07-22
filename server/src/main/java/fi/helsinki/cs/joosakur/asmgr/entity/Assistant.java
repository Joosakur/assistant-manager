package fi.helsinki.cs.joosakur.asmgr.entity;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.awt.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(
        name = "assistants",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"employer_id", "email"})
        },
        indexes = {
                @Index(name = "idx_assistant_1", columnList = "id", unique = true),
                @Index(name = "idx_assistant_2", columnList = "employer_id")
        }
)
public class Assistant {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "UUID")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    @NotNull
    private Employer employer;

    @Column(name = "email", nullable = false, length = 64)
    @NotNull
    @Size(min = 3, max = 64)
    @Email
    private String email;

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

    @Column(name = "nick", length = 12)
    @Size(min = 1, max = 12)
    private String nickname;

    private boolean active = true;

    @NotNull
    @Column(name = "bg_color")
    private Color backgroundColor = Color.GRAY;

    @NotNull
    @Column(name = "text_color")
    private Color textColor = Color.BLACK;


    public Assistant() {
    }

    public Assistant(Employer employer, String email, String firstName, String lastName, Date birthday) {
        this.employer = employer;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
    }

    public UUID getId() {
        return id;
    }

    public Employer getEmployer() {
        return employer;
    }

    public void setEmployer(Employer employer) {
        this.employer = employer;
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

    public Color getBackgroundColor() {
        return backgroundColor;
    }

    public void setBackgroundColor(Color backgroundColor) {
        this.backgroundColor = backgroundColor;
    }

    public Color getTextColor() {
        return textColor;
    }

    public void setTextColor(Color textColor) {
        this.textColor = textColor;
    }
}
