package fi.helsinki.cs.joosakur.asmgr.rest.model.export;

import java.time.LocalDate;
import java.util.UUID;

public class ExportPost {
    private UUID assistantId;
    private LocalDate from;
    private LocalDate to;

    public UUID getAssistantId() {
        return assistantId;
    }

    public void setAssistantId(UUID assistantId) {
        this.assistantId = assistantId;
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
}
