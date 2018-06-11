package fi.helsinki.cs.joosakur.asmgr.exception;

public abstract class ApplicationException extends Exception {

    private AppErrors errorCode;

    public ApplicationException(String message) {
        super(message);
    }

    public ApplicationException(String message, AppErrors errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public AppErrors getErrorCode() {
        return errorCode;
    }
}
