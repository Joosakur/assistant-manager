package fi.helsinki.cs.joosakur.rest.model.error;

public class ErrorResponse {

    public ErrorResponse() {
    }

    public ErrorResponse(String message) {
        this.message = message;
    }

    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
