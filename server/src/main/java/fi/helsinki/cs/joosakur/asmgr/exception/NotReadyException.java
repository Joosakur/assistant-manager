package fi.helsinki.cs.joosakur.asmgr.exception;

public class NotReadyException extends ApplicationException {

    public NotReadyException() {
        super("Precondition failed.");
    }

    public NotReadyException(String msg) {
        super(msg);
    }

}
