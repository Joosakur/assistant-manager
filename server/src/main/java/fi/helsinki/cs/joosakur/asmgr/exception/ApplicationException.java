package fi.helsinki.cs.joosakur.asmgr.exception;

public abstract class ApplicationException extends Exception {

    public ApplicationException(String message) {
        super(message);
    }
}
