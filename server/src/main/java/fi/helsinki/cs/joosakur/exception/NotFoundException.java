package fi.helsinki.cs.joosakur.exception;

public class NotFoundException extends ApplicationException {

    public NotFoundException() {
        super("Some entity was not found.");
    }

    public NotFoundException(String msg) {
        super(msg);
    }

}
