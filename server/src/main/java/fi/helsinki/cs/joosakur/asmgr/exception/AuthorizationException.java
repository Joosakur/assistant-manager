package fi.helsinki.cs.joosakur.asmgr.exception;

public class AuthorizationException extends ApplicationException {

    public AuthorizationException() {
        super("Not authorized.");
    }

    public AuthorizationException(String msg) {
        super(msg);
    }

}
