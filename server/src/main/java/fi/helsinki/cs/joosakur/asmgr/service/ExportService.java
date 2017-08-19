package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Export;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;

import java.time.LocalDate;
import java.util.UUID;

public interface ExportService {

    Export requestExport(Assistant assistant, LocalDate from, LocalDate to);

    Export find(UUID id) throws NotFoundException;

    void onExportComplete(UUID id, String downloadUrl) throws NotFoundException;

    void onExportError(UUID id, String error) throws NotFoundException;
}
