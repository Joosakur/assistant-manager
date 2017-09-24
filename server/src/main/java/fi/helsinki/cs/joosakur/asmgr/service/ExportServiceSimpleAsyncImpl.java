package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Export;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.repository.ExportRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class ExportServiceSimpleAsyncImpl implements ExportService{

    private static final Logger logger = LoggerFactory.getLogger(ExportServiceSimpleAsyncImpl.class);

    private final ExportRepository repository;

    private final HourListService hourListService;

    @Autowired
    public ExportServiceSimpleAsyncImpl(ExportRepository repository, HourListService hourListService) {
        this.repository = repository;
        this.hourListService = hourListService;
    }

    @Override
    @Transactional
    public Export requestExport(Assistant assistant, LocalDate from, LocalDate to) {
        logger.debug("Starting export for assistant {}", assistant.getId());
        Export export = new Export();
        export.setEmployer(assistant.getEmployer());
        export.setAssistant(assistant);
        export.setFrom(from);
        export.setTo(to);
        export.setStatus(Export.Status.RECEIVED);
        export = repository.saveAndFlush(export);
        logger.debug("Export {} saved", export.getId());
        final UUID id = export.getId();

        try {
            hourListService.handleExport(export)
                    .thenAccept(url -> onExportComplete(id, url))
                    .exceptionally((ex) -> {
                        onExportError(id, ex);
                        return null;
                    });
        } catch (IOException e) {
            onExportError(id, e);
        }

        logger.debug("Export {} saved", export.getId());
        return export;
    }

    @Override
    public Export find(UUID id) throws NotFoundException {
        Export export = repository.findOne(id);
        if(export == null)
            throw new NotFoundException("Export not found with id "+id);
        return export;
    }


    @Override
    @Transactional
    public void onExportComplete(UUID id, String downloadUrl) {
        logger.debug("Export {} was completed, download url is {}", id, downloadUrl);

        Export export = repository.findOne(id);
        if(export == null) {
            logger.warn("Completed export {} was not found", id);
            return;
        }

        export.setStatus(Export.Status.COMPLETED);
        export.setDownloadLink(downloadUrl);
        repository.saveAndFlush(export);
        logger.info("Export {} completion has been saved", id);
    }

    @Override
    @Transactional
    public void onExportError(UUID id, Throwable exception) {
        logger.warn("Export failed", exception);

        Export export = repository.findOne(id);
        if(export == null) {
            logger.warn("Export {} failed but was not found", id);
            return;
        }

        export.setStatus(Export.Status.ERROR);
        export.setError(exception.getMessage());
        repository.save(export);
        logger.debug("Export {} failure has been saved", id);
    }

}
