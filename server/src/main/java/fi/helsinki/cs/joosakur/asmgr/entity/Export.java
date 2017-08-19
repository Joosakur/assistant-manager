package fi.helsinki.cs.joosakur.asmgr.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "exports",
        indexes = {
                @Index(name = "idx_exports_1", columnList = "id", unique = true),
                @Index(name = "idx_exports_2", columnList = "assistant_id"),
        }
)
public class Export {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "UUID")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "employer_id", nullable = false)
    @NotNull
    private Employer employer;

    @ManyToOne
    @JoinColumn(name = "assistant_id", nullable = false)
    @NotNull
    private Assistant assistant;

    @Column(name = "from_date", nullable = false)
    @NotNull
    private LocalDate from;

    @Column(name = "to_date", nullable = false)
    @NotNull
    private LocalDate to;

    @Column(name = "status", nullable = false, length = 12)
    @Enumerated(EnumType.STRING)
    @NotNull
    private Status status;

    @Column(name = "download_link", length = 768)
    private String downloadLink;

    @Column(name = "error", length = 64)
    private String error;


    @Column(name = "expires")
    private LocalDateTime expires;

    public enum Status {
        RECEIVED("RECEIVED"),
        COMPLETED("COMPLETED"),
        ERROR("ERROR");

        private final String text;
        Status(String text) {
            this.text = text;
        }


        @Override
        public String toString() {
            return text;
        }
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

    public Assistant getAssistant() {
        return assistant;
    }

    public void setAssistant(Assistant assistant) {
        this.assistant = assistant;
    }

    public LocalDate getFrom() {
        return from;
    }

    public void setFrom(LocalDate from) {
        this.from = from;
    }

    public LocalDate getTo() {
        return to;
    }

    public void setTo(LocalDate to) {
        this.to = to;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getDownloadLink() {
        return downloadLink;
    }

    public void setDownloadLink(String downloadLink) {
        this.downloadLink = downloadLink;
    }

    public LocalDateTime getExpires() {
        return expires;
    }

    public void setExpires(LocalDateTime expires) {
        this.expires = expires;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
