package fi.helsinki.cs.joosakur.asmgr.rest.model.employer;

import fi.helsinki.cs.joosakur.asmgr.exception.ValidationErrors;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

@Component
public class PasswordChangeValidatorImpl implements PasswordChangeValidator {

    @Override
    public boolean supports(Class<?> clazz) {
        return PasswordChange.class.isAssignableFrom(clazz);
    }

    /**
     * Validates password change request and specifically checks that newPassword matches confirmPassword.
     */
    @Override
    public void validate(Object target, Errors errors) {
        PasswordChange passwordChange = (PasswordChange)target;
        if(passwordChange.getNewPassword() == null ||
                !passwordChange.getNewPassword().equals(passwordChange.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", ValidationErrors.PASSWORD_MISMATCH.toString(),"Passwords do not match");
        }

    }
}
