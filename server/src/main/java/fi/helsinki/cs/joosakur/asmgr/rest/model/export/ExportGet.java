package fi.helsinki.cs.joosakur.asmgr.rest.model.export;

import fi.helsinki.cs.joosakur.asmgr.entity.Export;

import java.time.format.DateTimeFormatter;
import java.util.UUID;

public class ExportGet {
    private UUID id;
    private String employerId;
    private String assistantId;
    private String from;
    private String to;
    private String status;
    private String downloadLink;

    public ExportGet() {

    }

    public ExportGet(Export export) {
        this.id = export.getId();
        this.employerId = export.getEmployer().getId().toString();
        this.assistantId = export.getAssistant().getId().toString();
        this.from = export.getFrom().format(DateTimeFormatter.ISO_DATE);
        this.to = export.getTo().format(DateTimeFormatter.ISO_DATE);
        this.status = export.getStatus().toString();
        this.downloadLink = export.getDownloadLink();
    }

    public static ExportGet newFromEntity(Export export) {
        return new ExportGet(export);
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmployerId() {
        return employerId;
    }

    public void setEmployerId(String employerId) {
        this.employerId = employerId;
    }

    public String getAssistantId() {
        return assistantId;
    }

    public void setAssistantId(String assistantId) {
        this.assistantId = assistantId;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDownloadLink() {
        return downloadLink;
    }

    public void setDownloadLink(String downloadLink) {
        this.downloadLink = downloadLink;
    }
}
