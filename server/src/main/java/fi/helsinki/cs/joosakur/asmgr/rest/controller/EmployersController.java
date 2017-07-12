package fi.helsinki.cs.joosakur.asmgr.rest.controller;

import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
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
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Employer employer = employerService.findByEmail(email);
        EmployerGet response = new EmployerGet().fromEntity(employer);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> changePassword(PasswordChange passwordData) {
        return null;
    }

    @Override
    public ResponseEntity<EmployerGet> updateEmployer(EmployerPut employerModel) {
        return null;
    }
}
