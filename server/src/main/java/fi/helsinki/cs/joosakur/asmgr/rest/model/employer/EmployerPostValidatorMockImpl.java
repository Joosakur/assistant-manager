package fi.helsinki.cs.joosakur.asmgr.rest.model.employer;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

@Component
@Profile({"dev"})
public class EmployerPostValidatorMockImpl implements EmployerPostValidator {

    @Override
    public boolean supports(Class<?> clazz) {
        return EmployerPost.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
    }
}
