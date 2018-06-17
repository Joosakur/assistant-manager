package fi.helsinki.cs.joosakur.asmgr.rest.model.employer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

@Component
@Profile({"dev"})
public class EmployerPostValidatorMockImpl implements EmployerPostValidator {
    private static final Logger logger = LoggerFactory.getLogger(EmployerPostValidatorMockImpl.class);

    @Override
    public boolean supports(Class<?> clazz) {
        return EmployerPost.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        EmployerPost model = (EmployerPost) target;
        String captcha = model.getCaptcha();
        logger.info("validating captcha: "+captcha);
    }
}
