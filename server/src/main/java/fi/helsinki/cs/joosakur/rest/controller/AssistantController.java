package fi.helsinki.cs.joosakur.rest.controller;

import fi.helsinki.cs.joosakur.entity.Assistant;
import fi.helsinki.cs.joosakur.entity.Employer;
import fi.helsinki.cs.joosakur.exception.NotFoundException;
import fi.helsinki.cs.joosakur.rest.model.assistant.AssistantGet;
import fi.helsinki.cs.joosakur.rest.model.assistant.AssistantPost;
import fi.helsinki.cs.joosakur.rest.model.error.ValidationError;
import fi.helsinki.cs.joosakur.service.AssistantService;
import fi.helsinki.cs.joosakur.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class AssistantController {

    private final EmployerService employerService;
    private final AssistantService assistantService;

    @Autowired
    public AssistantController(EmployerService employerService, AssistantService assistantService) {
        this.employerService = employerService;
        this.assistantService = assistantService;
    }

    @RequestMapping(path = "/assistants", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<Object> listAssistants() {
        List<AssistantGet> response = new ArrayList<>();
        for (Assistant assistant : assistantService.list()) {
            response.add(new AssistantGet(assistant));
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(path = "/assistants", method = RequestMethod.POST,
            consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> createAssistant(@Valid AssistantPost assistantPost, BindingResult result) throws NotFoundException {
        if(result.hasErrors())
            return new ResponseEntity<>(new ValidationError(), HttpStatus.BAD_REQUEST);

        Employer employer = employerService.findById(UUID.fromString(assistantPost.getEmployerId()));
        Assistant assistant = new Assistant(employer, assistantPost.getEmail(), assistantPost.getFirstName(),
                assistantPost.getLastName(), assistantPost.getNickname(), assistantPost.getBirthday());

        assistant = assistantService.create(assistant);

        return new ResponseEntity<>(new AssistantGet(assistant), HttpStatus.CREATED);
    }

    @RequestMapping(path = "/assistants/{id}", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<Object> getAssistant(@PathVariable(name = "id") String id) throws NotFoundException {
        return new ResponseEntity<>(assistantService.findById(UUID.fromString(id)), HttpStatus.OK);
    }


    @RequestMapping(path = "/assistants/{id}", method = RequestMethod.PUT,
            consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> updateAssistant(@PathVariable(name = "id") String id,
                                                 @Valid AssistantPost assistantPost, BindingResult result) throws NotFoundException {
        if(result.hasErrors())
            return new ResponseEntity<>(new ValidationError(), HttpStatus.BAD_REQUEST);

        UUID uuid = UUID.fromString(id);
        Employer employer = employerService.findById(UUID.fromString(assistantPost.getEmployerId()));
        Assistant assistant = new Assistant(uuid, employer, assistantPost.getEmail(), assistantPost.getFirstName(),
                assistantPost.getLastName(), assistantPost.getNickname(), assistantPost.getBirthday());
        assistantService.update(assistant);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @RequestMapping(path = "/assistants/{id}", method = RequestMethod.DELETE, produces = "application/json")
    public ResponseEntity<Object> deleteAssistant(@PathVariable(name = "id") String id) throws NotFoundException {
        assistantService.delete(UUID.fromString(id));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
