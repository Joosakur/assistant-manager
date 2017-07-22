package fi.helsinki.cs.joosakur.asmgr.rest.controller;

import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.exception.AuthorizationException;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.rest.model.employer.EmployerGet;
import fi.helsinki.cs.joosakur.asmgr.rest.model.employer.EmployerPost;
import fi.helsinki.cs.joosakur.asmgr.rest.model.employer.EmployerPut;
import fi.helsinki.cs.joosakur.asmgr.rest.model.employer.PasswordChange;
import fi.helsinki.cs.joosakur.asmgr.service.EmployerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

@Controller
public class EmployersController implements EmployersApi {

    private final EmployerService employerService;

    public EmployersController(EmployerService employerService) {
        this.employerService = employerService;
    }

    private Employer getAuthenticatedEmployer() throws NotFoundException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return employerService.findByEmail(email);
    }

    @Override
    public ResponseEntity<EmployerGet> createEmployer(@Valid @RequestBody EmployerPost employerModel) {
        Employer employer = new Employer(
                employerModel.getEmail(),
                employerModel.getPassword(),
                employerModel.getFirstName(),
                employerModel.getLastName(),
                employerModel.getBirthday()
        );
        employer = employerService.create(employer);
        EmployerGet response = new EmployerGet().fromEntity(employer);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Override
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<EmployerGet> getEmployerSelf() throws NotFoundException {
        Employer employer = getAuthenticatedEmployer();
        EmployerGet response = new EmployerGet().fromEntity(employer);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<Void> changePassword(@Valid @RequestBody PasswordChange passwordData) throws NotFoundException, AuthorizationException {
        Employer employer = getAuthenticatedEmployer();
        employerService.changePassword(employer.getId(), passwordData.getOldPassword(), passwordData.getNewPassword());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<EmployerGet> updateEmployer(@Valid @RequestBody EmployerPut employerModel) throws NotFoundException {
        Employer employer = getAuthenticatedEmployer();

        employer.setFirstName(employerModel.getFirstName());
        employer.setLastName(employerModel.getLastName());
        employer.setBirthday(employerModel.getBirthday());

        employer = employerService.update(employer);
        EmployerGet response = new EmployerGet().fromEntity(employer);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
