package fi.helsinki.cs.joosakur.asmgr.entity;

public enum UserRole {
    ADMIN("ADMIN"),
    EMPLOYER("EMPLOYER")
    ;

    private final String text;

    UserRole(final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
