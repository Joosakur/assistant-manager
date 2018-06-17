package fi.helsinki.cs.joosakur.asmgr.exception;

public enum ValidationErrors {
    WRONG_PASSWORD("WRONG_PASSWORD"),
    PASSWORD_MISMATCH("PASSWORD_MISMATCH"),
    ;

    private String value;

    ValidationErrors(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }
}
