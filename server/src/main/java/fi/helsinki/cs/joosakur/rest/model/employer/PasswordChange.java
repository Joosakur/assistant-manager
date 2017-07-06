package fi.helsinki.cs.joosakur.rest.model.employer;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class PasswordChange {

    @NotNull
    @Size(min = 8, max = 30)
    private String oldPassword;

    @NotNull
    @Size(min = 8, max = 30)
    private String newPassword;

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
