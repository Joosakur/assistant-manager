package fi.helsinki.cs.joosakur.asmgr.rest.model.error;

import fi.helsinki.cs.joosakur.asmgr.exception.AppErrors;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class FormErrorResponse extends ErrorResponse {

    private List<SimpleFieldError> fieldErrors;

    public FormErrorResponse(BindingResult result) {
        super("Validation failed", AppErrors.VALIDATION_FAILED);
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
        private List<String> arguments;

        SimpleFieldError(FieldError fieldError) {
            this.field = fieldError.getField();
            this.message = fieldError.getDefaultMessage();
            this.arguments = Arrays.stream(fieldError.getArguments())
                    .map(Object::toString)
                    .collect(Collectors.toList());
        }

        public String getField() {
            return field;
        }

        public String getMessage() {
            return message;
        }

        public List<String> getArguments() {
            return arguments;
        }
    }
}
