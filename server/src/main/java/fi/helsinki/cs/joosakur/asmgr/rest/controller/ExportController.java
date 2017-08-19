package fi.helsinki.cs.joosakur.asmgr.rest.controller;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Export;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.rest.model.export.ExportGet;
import fi.helsinki.cs.joosakur.asmgr.rest.model.export.ExportPost;
import fi.helsinki.cs.joosakur.asmgr.service.AssistantService;
import fi.helsinki.cs.joosakur.asmgr.service.ExportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

@RestController
public class ExportController {

    private final ExportService exportService;

    private final AssistantService assistantService;

    @Autowired
    public ExportController(ExportService exportService, AssistantService assistantService) {
        this.exportService = exportService;
        this.assistantService = assistantService;
    }

    @RequestMapping(value = "/work-shifts/exports",
            produces = {"application/json"},
            consumes = {"application/json"},
            method = RequestMethod.POST)
    @PreAuthorize("hasRole('EMPLOYER')")
    @ResponseStatus(HttpStatus.CREATED)
    public ExportGet requestExport(@RequestBody @Valid ExportPost model) throws NotFoundException {
        Assistant assistant = assistantService.find(model.getAssistantId());
        Export export = exportService.requestExport(assistant, model.getFrom(), model.getTo());
        return new ExportGet(export);
    }

    @RequestMapping(value = "/work-shifts/exports/{id}",
            produces = {"application/json"},
            method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasRole('EMPLOYER')")
    public ExportGet checkExport(@PathVariable("id") UUID id) throws NotFoundException {
        Export export = exportService.find(id);
        return new ExportGet(export);
    }



}
