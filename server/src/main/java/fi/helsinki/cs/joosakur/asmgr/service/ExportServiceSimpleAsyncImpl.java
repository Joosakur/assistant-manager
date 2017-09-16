package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Export;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.repository.ExportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class ExportServiceSimpleAsyncImpl implements ExportService{

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
        Export export = new Export();
        export.setEmployer(assistant.getEmployer());
        export.setAssistant(assistant);
        export.setFrom(from);
        export.setTo(to);
        export.setStatus(Export.Status.RECEIVED);
        export = repository.save(export);
        final UUID id = export.getId();

        try {
            System.out.println("scheduling export");
            hourListService.handleExport(export)
                    .thenAccept(url -> {
                        onExportComplete(id, url);
                    });
        } catch (Exception e) {
            e.printStackTrace();
            onExportError(id, e.getMessage());
        }

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
        System.out.println("export completed");
        Export export = repository.findOne(id);
        if(export == null)
            return;
        export.setStatus(Export.Status.COMPLETED);
        export.setDownloadLink(downloadUrl);
        repository.saveAndFlush(export);
    }

    @Override
    @Transactional
    public void onExportError(UUID id, String error) {
        System.out.println("export failed:"+error);
        Export export = repository.findOne(id);
        if(export == null)
            return;
        export.setStatus(Export.Status.ERROR);
        export.setError(error);
        repository.save(export);
    }

}
