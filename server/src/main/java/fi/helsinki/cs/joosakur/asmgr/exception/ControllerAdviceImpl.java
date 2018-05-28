package fi.helsinki.cs.joosakur.asmgr.exception;

import fi.helsinki.cs.joosakur.asmgr.rest.model.error.ErrorResponse;
import fi.helsinki.cs.joosakur.asmgr.rest.model.error.FormErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolationException;

@RestControllerAdvice
public class ControllerAdviceImpl extends ResponseEntityExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(ControllerAdviceImpl.class);

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ErrorResponse handleException(ConstraintViolationException ex) {
        logger.info("Responding with 400", ex);
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ErrorResponse handleException(IllegalArgumentException ex) {
        logger.info("Responding with 400", ex);
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    ErrorResponse handleException(AuthenticationException ex) {
        logger.info("Responding with 401", ex);
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(AuthorizationException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    ErrorResponse handleException(AuthorizationException ex) {
        logger.info("Responding with 403", ex);
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    ErrorResponse handleException(NotFoundException ex) {
        logger.info("Responding with 404", ex);
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(NotUniqueException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    ErrorResponse handleException(NotUniqueException ex) {
        logger.info("Responding with 409", ex);
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(ResourceExpiredException.class)
    @ResponseStatus(HttpStatus.GONE)
    ErrorResponse handleException(ResourceExpiredException ex) {
        logger.info("Responding with 410", ex);
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(NotReadyException.class)
    @ResponseStatus(HttpStatus.PRECONDITION_FAILED)
    ErrorResponse handleException(NotReadyException ex) {
        logger.info("Responding with 412", ex);
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    ErrorResponse handleException(Exception ex) {
        logger.error("Responding with 500", ex);
        return new ErrorResponse(ex.getMessage());
    }

    @Override
    @ResponseBody
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        //todo: better handling
        logger.warn("Responding with 400", ex);
        return new ResponseEntity<>(new FormErrorResponse(ex.getBindingResult()), HttpStatus.BAD_REQUEST);
    }
}
