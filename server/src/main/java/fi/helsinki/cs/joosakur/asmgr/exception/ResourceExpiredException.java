package fi.helsinki.cs.joosakur.asmgr.exception;

public class ResourceExpiredException extends ApplicationException {

    public ResourceExpiredException() {
        super("Resource has expired.");
    }

    public ResourceExpiredException(String msg) {
        super(msg);
    }

}
