package fi.helsinki.cs.joosakur.exception;

public class NotUniqueException extends ApplicationException {

    public NotUniqueException() {
        super("Some uniqueness constraint was violated.");
    }

    public NotUniqueException(String msg) {
        super(msg);
    }

}
