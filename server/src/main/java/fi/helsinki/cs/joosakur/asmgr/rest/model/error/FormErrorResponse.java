package fi.helsinki.cs.joosakur.asmgr.rest.model.error;

import fi.helsinki.cs.joosakur.asmgr.exception.AppErrors;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class FormErrorResponse extends ErrorResponse {

    private List<SimpleFieldError> fieldErrors;

    public FormErrorResponse(Errors errors) {
        super("Validation failed", AppErrors.VALIDATION_FAILED);
        fieldErrors = new ArrayList<>(errors.getFieldErrorCount());
        for (FieldError fieldError : errors.getFieldErrors()) {
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
        private String errorCode;

        SimpleFieldError(FieldError fieldError) {
            this.field = fieldError.getField();
            this.message = fieldError.getDefaultMessage();
            this.arguments = Optional.ofNullable(fieldError.getArguments())
                    .map(Arrays::asList)
                    .orElseGet(ArrayList::new)
                    .stream()
                    .map(Object::toString)
                    .collect(Collectors.toList());
            this.errorCode = fieldError.getCode();
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

        public String getErrorCode() {
            return errorCode;
        }
    }
}
