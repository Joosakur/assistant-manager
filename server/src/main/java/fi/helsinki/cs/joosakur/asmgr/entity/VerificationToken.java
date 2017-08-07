package fi.helsinki.cs.joosakur.asmgr.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "verification_tokens",
        indexes = {
                @Index(name = "idx_verification_tokens_1", columnList = "id", unique = true)
        }
)
public class VerificationToken {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "UUID")
    private UUID id;

    @Column(name = "expires")
    private LocalDateTime expires;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    @NotNull
    private Employer employer;

    @Column(name = "target", length = 16)
    @Enumerated(EnumType.STRING)
    @NotNull
    private Target target;

    @Column(name = "used")
    @NotNull
    private boolean used;

    public enum Target {
        NEW_ACCOUNT
    }

    public UUID getId() {
        return id;
    }

    public LocalDateTime getExpires() {
        return expires;
    }

    public void setExpires(LocalDateTime expires) {
        this.expires = expires;
    }

    public Employer getEmployer() {
        return employer;
    }

    public void setEmployer(Employer employer) {
        this.employer = employer;
    }

    public Target getTarget() {
        return target;
    }

    public void setTarget(Target target) {
        this.target = target;
    }

    public boolean isUsed() {
        return used;
    }

    public void setUsed(boolean used) {
        this.used = used;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VerificationToken token = (VerificationToken) o;

        if (used != token.used) return false;
        if (id != null ? !id.equals(token.id) : token.id != null) return false;
        if (expires != null ? !expires.equals(token.expires) : token.expires != null) return false;
        if (employer != null ? !employer.equals(token.employer) : token.employer != null) return false;
        return target == token.target;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (expires != null ? expires.hashCode() : 0);
        result = 31 * result + (employer != null ? employer.hashCode() : 0);
        result = 31 * result + (target != null ? target.hashCode() : 0);
        result = 31 * result + (used ? 1 : 0);
        return result;
    }
}
