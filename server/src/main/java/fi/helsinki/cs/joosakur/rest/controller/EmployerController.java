package fi.helsinki.cs.joosakur.rest.controller;

import fi.helsinki.cs.joosakur.entity.Employer;
import fi.helsinki.cs.joosakur.exception.AuthorizationException;
import fi.helsinki.cs.joosakur.exception.NotFoundException;
import fi.helsinki.cs.joosakur.rest.model.employer.EmployerGet;
import fi.helsinki.cs.joosakur.rest.model.employer.EmployerPost;
import fi.helsinki.cs.joosakur.rest.model.employer.EmployerPut;
import fi.helsinki.cs.joosakur.rest.model.employer.PasswordChange;
import fi.helsinki.cs.joosakur.rest.model.error.ValidationError;
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
public class EmployerController {

    private final EmployerService employerService;

    @Autowired
    public EmployerController(EmployerService employerService) {
        this.employerService = employerService;
    }

    @RequestMapping(path = "/employers", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<Object> listEmployers() {
        List<EmployerGet> response = new ArrayList<>();
        for (Employer employer : employerService.list()) {
            response.add(new EmployerGet(employer));
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(path = "/employers", method = RequestMethod.POST,
            consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> createEmployer(@Valid EmployerPost employerPost, BindingResult result) {
        if(result.hasErrors())
            return new ResponseEntity<>(new ValidationError(), HttpStatus.BAD_REQUEST);

        Employer employer = new Employer(employerPost.getEmail(), employerPost.getPassword(),
                employerPost.getFirstName(), employerPost.getLastName(), employerPost.getBirthday());

        employer = employerService.create(employer);

        return new ResponseEntity<>(new EmployerGet(employer), HttpStatus.CREATED);
    }

    @RequestMapping(path = "/employers/{id}", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<Object> getEmployer(@PathVariable(name = "id") String id) throws NotFoundException {
        return new ResponseEntity<>(employerService.findById(UUID.fromString(id)), HttpStatus.OK);
    }


    @RequestMapping(path = "/employers/{id}", method = RequestMethod.PUT,
            consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> updateEmployer(@PathVariable(name = "id") String id,
                                                 @Valid EmployerPut employerPut, BindingResult result) throws NotFoundException {
        if(result.hasErrors())
            return new ResponseEntity<>(new ValidationError(), HttpStatus.BAD_REQUEST);

        UUID uuid = UUID.fromString(id);
        Employer employer = new Employer(uuid, employerPut.getEmail(), null,
                employerPut.getFirstName(), employerPut.getLastName(), employerPut.getBirthday());

        employerService.update(employer);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @RequestMapping(path = "/employers/{id}", method = RequestMethod.DELETE, produces = "application/json")
    public ResponseEntity<Object> deleteEmployer(@PathVariable(name = "id") String id) throws NotFoundException {
        employerService.delete(UUID.fromString(id));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @RequestMapping(path = "/employers/{id}/password", method = RequestMethod.POST,
            consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> updateEmployerPassword(@PathVariable(name = "id") String id,
                                                         @Valid PasswordChange passwordChange, BindingResult result)
            throws NotFoundException, AuthorizationException {
        if(result.hasErrors())
            return new ResponseEntity<>(new ValidationError(), HttpStatus.BAD_REQUEST);

        employerService.changePassword(UUID.fromString(id), passwordChange.getOldPassword(), passwordChange.getNewPassword());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
