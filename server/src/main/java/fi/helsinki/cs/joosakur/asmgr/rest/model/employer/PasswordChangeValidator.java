package fi.helsinki.cs.joosakur.asmgr.rest.model.employer;


import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class PasswordChangeValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return PasswordChange.class.isAssignableFrom(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        PasswordChange passwordChange = (PasswordChange) o;

        if(!passwordChange.getNewPassword().equals(passwordChange.getConfirmPassword()))
            errors.rejectValue("confirmPassword", "Passwords do not match");
    }
}
