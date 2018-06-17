package fi.helsinki.cs.joosakur.asmgr.rest.model.employer;

import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.exception.ValidationErrors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

@Component
public class PasswordChangeLateValidator {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public PasswordChangeLateValidator(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public void validate(PasswordChange passwordChange, Employer employer, Errors errors) {
        if(!passwordEncoder.matches(passwordChange.getOldPassword(), employer.getPassword()))
            errors.rejectValue("oldPassword", ValidationErrors.WRONG_PASSWORD.toString(), "Wrong password");
    }
}
