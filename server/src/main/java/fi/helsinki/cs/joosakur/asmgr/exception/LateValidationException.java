package fi.helsinki.cs.joosakur.asmgr.exception;

import org.springframework.validation.Errors;

public class LateValidationException extends ApplicationException {

    private Errors errors;

    public LateValidationException(Errors errors) {
        super("Validation failed");
        this.errors = errors;
    }

    public Errors getErrors() {
        return errors;
    }
}
