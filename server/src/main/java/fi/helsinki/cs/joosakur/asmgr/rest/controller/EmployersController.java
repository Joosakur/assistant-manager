package fi.helsinki.cs.joosakur.asmgr.rest.controller;

import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.exception.*;
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
import org.springframework.validation.Errors;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class EmployersController implements EmployersApi {

    private final EmployerService employerService;

    private final EmployerPostValidator employerPostValidator;

    private final PasswordChangeValidator passwordChangeValidator;

    private final PasswordChangeLateValidator passwordChangeLateValidator;

    @Autowired
    public EmployersController(EmployerService employerService, EmployerPostValidator employerPostValidator, PasswordChangeValidator passwordChangeValidator, PasswordChangeLateValidator passwordChangeLateValidator) {
        this.employerService = employerService;
        this.employerPostValidator = employerPostValidator;
        this.passwordChangeValidator = passwordChangeValidator;
        this.passwordChangeLateValidator = passwordChangeLateValidator;
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

    @InitBinder("employerPost")
    protected void initBinderEmployerPostValidator(WebDataBinder binder) {
        binder.addValidators(employerPostValidator);
    }

    @Override
    @ResponseStatus(HttpStatus.CREATED)
    public EmployerGet createEmployer(@Valid @RequestBody EmployerPost employerPost) throws NotUniqueException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        Employer employer = new Employer(
                employerPost.getEmail(),
                employerPost.getPassword(),
                employerPost.getFirstName(),
                employerPost.getLastName(),
                employerPost.getBirthday(),
                employerPost.getCity(),
                employerPost.isHetaMember()
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

    @InitBinder("passwordChange")
    protected void initBinderPasswordChangeValidator(WebDataBinder binder) {
        binder.addValidators(passwordChangeValidator);
    }

    @Override
    @PreAuthorize("hasRole('EMPLOYER')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changePassword(@Valid @RequestBody PasswordChange passwordChange, Errors errors) throws NotFoundException, LateValidationException {
        Employer employer = getAuthenticatedEmployer();
        passwordChangeLateValidator.validate(passwordChange, employer, errors);
        if(errors.hasErrors()) throw new LateValidationException(errors);
        employerService.changePassword(employer.getId(), passwordChange.getOldPassword(), passwordChange.getNewPassword());
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
