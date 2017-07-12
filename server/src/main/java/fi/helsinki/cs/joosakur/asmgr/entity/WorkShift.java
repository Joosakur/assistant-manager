package fi.helsinki.cs.joosakur.asmgr.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
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
    @Column(name = "starts")
    private Date starts;

    @NotNull
    @Column(name = "ends")
    private Date ends;

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

    public Date getStarts() {
        return starts;
    }

    public void setStarts(Date starts) {
        this.starts = starts;
    }

    public Date getEnds() {
        return ends;
    }

    public void setEnds(Date ends) {
        this.ends = ends;
    }
}
