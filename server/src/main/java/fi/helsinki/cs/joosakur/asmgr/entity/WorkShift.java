package fi.helsinki.cs.joosakur.asmgr.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "work_shifts",
        indexes = {
                @Index(name = "idx_work_shift_1", columnList = "id", unique = true),
                @Index(name = "idx_work_shift_2", columnList = "employer_id"),
                @Index(name = "idx_work_shift_3", columnList = "employer_id,starts,ends"),
                @Index(name = "idx_work_shift_4", columnList = "assistant_id"),
                @Index(name = "idx_work_shift_5", columnList = "assistant_id,starts,ends"),
        }
)
public class WorkShift {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "UUID")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    private Employer employer;

    @ManyToOne
    @JoinColumn(name = "assistant_id")
    private Assistant assistant;

    @NotNull
    @Column(name = "starts", columnDefinition = "TIMESTAMP")
    private LocalDateTime starts;

    @NotNull
    @Column(name = "ends", columnDefinition = "TIMESTAMP")
    private LocalDateTime ends;

    @NotNull
    @Column(name = "sick")
    private boolean sick = false;

    public WorkShift() {
    }

    public WorkShift(Employer employer, Assistant assistant, LocalDateTime starts, LocalDateTime ends) {
        this.employer = employer;
        this.assistant = assistant;
        this.starts = starts;
        this.ends = ends;
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

    public LocalDateTime getStarts() {
        return starts;
    }

    public void setStarts(LocalDateTime starts) {
        this.starts = starts;
    }

    public LocalDateTime getEnds() {
        return ends;
    }

    public void setEnds(LocalDateTime ends) {
        this.ends = ends;
    }

    public boolean isSick() {
        return sick;
    }

    public void setSick(boolean sick) {
        this.sick = sick;
    }
}
