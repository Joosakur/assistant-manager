package fi.helsinki.cs.joosakur.asmgr.rest.model.error;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.List;

public class FormErrorResponse extends ErrorResponse {

    private List<SimpleFieldError> fieldErrors;

    public FormErrorResponse(BindingResult result) {
        super("Validation failed");
        fieldErrors = new ArrayList<>(result.getFieldErrorCount());
        for (FieldError fieldError : result.getFieldErrors()) {
            fieldErrors.add(new SimpleFieldError(fieldError));
        }
    }

    public List<SimpleFieldError> getFieldErrors() {
        return fieldErrors;
    }

    private class SimpleFieldError {
        private String field;
        private String message;
        SimpleFieldError(FieldError fieldError) {
            this.field = fieldError.getField();
            this.message = fieldError.getDefaultMessage();
        }

        public String getField() {
            return field;
        }

        public String getMessage() {
            return message;
        }

    }
}

