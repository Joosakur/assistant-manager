package fi.helsinki.cs.joosakur.rest.model.error;

public class ValidationError extends ErrorResponse {

    public ValidationError() {
        super("Validation failed.");
    }


}
