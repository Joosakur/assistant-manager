package fi.helsinki.cs.joosakur.asmgr.rest.controller;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.rest.model.assistant.AssistantGet;
import fi.helsinki.cs.joosakur.asmgr.rest.model.assistant.AssistantPost;
import fi.helsinki.cs.joosakur.asmgr.rest.model.assistant.AssistantPut;
import fi.helsinki.cs.joosakur.asmgr.service.AssistantService;
import fi.helsinki.cs.joosakur.asmgr.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Controller
public class AssistantsController implements AssistantsApi {

    private final EmployerService employerService;
    private final AssistantService assistantService;

    @Autowired
    public AssistantsController(EmployerService employerService, AssistantService assistantService) {
        this.employerService = employerService;
        this.assistantService = assistantService;
    }

    private Employer getAuthenticatedEmployer() throws NotFoundException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return employerService.findByEmail(email);
    }

    @Override
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<List<AssistantGet>> listMyAssistants() throws NotFoundException {
        Employer employer = getAuthenticatedEmployer();
        List<Assistant> assistants = assistantService.listByEmployer(employer);
        List<AssistantGet> response = new ArrayList<>(assistants.size());
        for (Assistant assistant : assistants) {
            response.add(new AssistantGet().fromEntity(assistant));
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> deleteAssistant(UUID id) {
        return null;
    }

    @Override
    public ResponseEntity<AssistantGet> getAssistant(UUID id) {
        return null;
    }

    @Override
    public ResponseEntity<AssistantGet> updateAssistant(UUID id, AssistantPut assistantModel) {
        return null;
    }

    @Override
    public ResponseEntity<AssistantGet> createAssistant(AssistantPost assistantModel) {
        return null;
    }
}
