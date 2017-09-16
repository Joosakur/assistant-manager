package fi.helsinki.cs.joosakur.asmgr.rest.controller;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.exception.AuthorizationException;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.rest.model.assistant.AssistantGet;
import fi.helsinki.cs.joosakur.asmgr.rest.model.assistant.AssistantPost;
import fi.helsinki.cs.joosakur.asmgr.service.AssistantService;
import fi.helsinki.cs.joosakur.asmgr.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.awt.*;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
public class AssistantsController implements AssistantsApi {

    private final EmployerService employerService;
    private final AssistantService assistantService;

    @Autowired
    public AssistantsController(EmployerService employerService, AssistantService assistantService) {
        this.employerService = employerService;
        this.assistantService = assistantService;
    }

    private Employer getAuthenticatedEmployer() throws AuthenticationException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth == null)
            throw new AuthenticationCredentialsNotFoundException("Authentication not found.");

        String email = auth.getName();
        try {
            return employerService.findByEmail(email);
        } catch (NotFoundException e) {
            throw new UsernameNotFoundException("The authenticated user was not found.");
        }
    }


    @Override
    @PreAuthorize("hasRole('EMPLOYER')")
    public List<AssistantGet> listMyAssistants() {
        Employer employer = getAuthenticatedEmployer();
        List<Assistant> assistants = assistantService.listByEmployer(employer);
        return assistants.stream()
                .map(AssistantGet::newFromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAssistant(UUID id) {
        return;
    }

    @Override
    @ResponseStatus(HttpStatus.OK)
    public AssistantGet getAssistant(UUID id) {
        return null;
    }

    @Override
    public List<AssistantGet> listActiveCoworkers(@PathVariable("id") UUID id) throws NotFoundException, AuthorizationException {
        Assistant assistant = assistantService.find(id);
        if(!assistant.isActive())
            throw new AuthorizationException("Not currently employed, access denied.");
        return assistantService.listByEmployer(assistant.getEmployer()).stream()
                .filter(Assistant::isActive)
                .map(AssistantGet::newFromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @ResponseStatus(HttpStatus.OK)
    public AssistantGet updateAssistant(@PathVariable("id") UUID id, @Valid @RequestBody AssistantPost assistantModel) throws NotFoundException, AuthorizationException {
        Employer employer = getAuthenticatedEmployer();
        Assistant assistant = assistantService.find(id);
        if(!assistant.getEmployer().equals(employer))
            throw new AuthorizationException("Not your assistant!");

        assistant.setFirstName(assistantModel.getFirstName());
        assistant.setLastName(assistantModel.getLastName());
        assistant.setNickname(assistantModel.getNickName());
        assistant.setBirthday(assistantModel.getBirthday());
        assistant.setNickname(assistantModel.getNickName());
        if(assistantModel.getBackgroundColor() != null)
            assistant.setBackgroundColor(Color.decode(assistantModel.getBackgroundColor()));
        if(assistantModel.getTextColor() != null)
            assistant.setTextColor(Color.decode(assistantModel.getTextColor()));

        assistant = assistantService.update(assistant);
        return new AssistantGet().fromEntity(assistant);
    }

    @Override
    @ResponseStatus(HttpStatus.CREATED)
    public AssistantGet createAssistant(@Valid @RequestBody AssistantPost assistantModel) {
        Employer employer = getAuthenticatedEmployer();
        Assistant assistant = new Assistant(employer, assistantModel.getEmail(),
                assistantModel.getFirstName(), assistantModel.getLastName(), assistantModel.getBirthday());
        assistant.setNickname(assistantModel.getNickName());
        if(assistantModel.getBackgroundColor() != null)
            assistant.setBackgroundColor(Color.decode(assistantModel.getBackgroundColor()));
        if(assistantModel.getTextColor() != null)
            assistant.setTextColor(Color.decode(assistantModel.getTextColor()));

        assistant = assistantService.create(assistant);
        return new AssistantGet().fromEntity(assistant);
    }
}
