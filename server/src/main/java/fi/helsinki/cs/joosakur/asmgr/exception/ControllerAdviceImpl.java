package fi.helsinki.cs.joosakur.asmgr.exception;

import fi.helsinki.cs.joosakur.asmgr.rest.model.error.ErrorResponse;
import fi.helsinki.cs.joosakur.asmgr.rest.model.error.FormErrorResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolationException;

@ControllerAdvice
public class ControllerAdviceImpl extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ErrorResponse handleException(ConstraintViolationException ex) {
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ErrorResponse handleException(IllegalArgumentException ex) {
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(AuthorizationException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    ErrorResponse handleException(AuthorizationException ex) {
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    ErrorResponse handleException(NotFoundException ex) {
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(NotUniqueException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    ErrorResponse handleException(NotUniqueException ex) {
        return new ErrorResponse(ex.getMessage());
    }

    @Override
    @ResponseBody
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        String parameterName = ex.getParameter().getParameterName();
        System.out.println(ex.getMessage());
        return new ResponseEntity<>(new FormErrorResponse(ex.getBindingResult()), HttpStatus.BAD_REQUEST);
    }
}