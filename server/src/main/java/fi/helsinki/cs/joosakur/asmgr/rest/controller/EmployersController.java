package fi.helsinki.cs.joosakur.asmgr.rest.controller;

import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.exception.AuthorizationException;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.exception.NotUniqueException;
import fi.helsinki.cs.joosakur.asmgr.exception.ResourceExpiredException;
import fi.helsinki.cs.joosakur.asmgr.rest.model.employer.*;
import fi.helsinki.cs.joosakur.asmgr.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class EmployersController implements EmployersApi {

    private final EmployerService employerService;

    private final EmployerPostValidator employerPostValidator;

    @Autowired
    public EmployersController(EmployerService employerService, EmployerPostValidator employerPostValidator) {
        this.employerService = employerService;
        this.employerPostValidator = employerPostValidator;
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

    @InitBinder(value = "employerModel")
    protected void initBinderEmployerPostValidator(WebDataBinder binder) {
        binder.addValidators(employerPostValidator);
    }

    @Override
    @ResponseStatus(HttpStatus.CREATED)
    public EmployerGet createEmployer(@Valid @ModelAttribute("employerModel") @RequestBody EmployerPost employerModel) throws NotUniqueException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        Employer employer = new Employer(
                employerModel.getEmail(),
                employerModel.getPassword(),
                employerModel.getFirstName(),
                employerModel.getLastName(),
                employerModel.getBirthday(),
                employerModel.getCity(),
                employerModel.isHetaMember()
        );
        employer = employerService.create(employer, false);
        return new EmployerGet().fromEntity(employer);
    }

    @Override
    @PreAuthorize("hasRole('EMPLOYER')")
    @ResponseStatus(HttpStatus.OK)
    public EmployerGet getEmployerSelf() {
        Employer employer = getAuthenticatedEmployer();
        return new EmployerGet().fromEntity(employer);
    }

    @Override
    @PreAuthorize("hasRole('EMPLOYER')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changePassword(@Valid @RequestBody PasswordChange passwordData) throws NotFoundException, AuthorizationException {
        Employer employer = getAuthenticatedEmployer();
        employerService.changePassword(employer.getId(), passwordData.getOldPassword(), passwordData.getNewPassword());
    }

    @Override
    @PreAuthorize("hasRole('EMPLOYER')")
    @ResponseStatus(HttpStatus.OK)
    public EmployerGet updateEmployer(@Valid @RequestBody EmployerPut employerUpdateModel) throws NotFoundException {
        Employer employer = getAuthenticatedEmployer();

        employer.setFirstName(employerUpdateModel.getFirstName());
        employer.setLastName(employerUpdateModel.getLastName());
        employer.setBirthday(employerUpdateModel.getBirthday());
        employer.setHetaMember(employerUpdateModel.isHetaMember());
        employer.setCity(employerUpdateModel.getCity());

        employer = employerService.update(employer);
        return new EmployerGet().fromEntity(employer);
    }

    @Override
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void verify(@RequestParam("token") String token) throws AuthorizationException, ResourceExpiredException {
        employerService.verifyAccount(token);
    }

}
