package fi.helsinki.cs.joosakur.asmgr.exception;

public class NotFoundException extends ApplicationException {

    public NotFoundException() {
        super("Some entity was not found.");
    }

    public NotFoundException(String msg) {
        super(msg);
    }

    public NotFoundException(String msg, AppErrors errorCode) {
        super(msg, errorCode);
    }

}
