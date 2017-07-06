package fi.helsinki.cs.joosakur.exception;

public abstract class ApplicationException extends Exception {

    public ApplicationException(String message) {
        super(message);
    }
}
