package fi.helsinki.cs.joosakur.asmgr.exception;

public enum AppErrors {
    // 400
    VALIDATION_FAILED("VALIDATION_FAILED"),

    // 401
    AUTHENTICATION_ERROR("AUTHENTICATION_ERROR"),
    AUTHORIZATION_ERROR("AUTHORIZATION_ERROR"),
    BAD_CREDENTIALS("BAD_CREDENTIALS"),
    USERNAME_NOT_FOUND("USERNAME_NOT_FOUND"),

    // 412
    ACCOUNT_NOT_VERIFIED("ACCOUNT_NOT_VERIFIED")
    ;

    private String value;

    AppErrors(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }
}
