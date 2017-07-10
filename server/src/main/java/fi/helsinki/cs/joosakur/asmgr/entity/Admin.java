package fi.helsinki.cs.joosakur.asmgr.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.util.Collection;
import java.util.Date;

@Entity
@Table(
        name = "admins",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email")
        }
)
public class Admin extends User {

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.createAuthorityList(UserRole.ADMIN.toString());
    }

    public Admin() {
    }

    public Admin(String email, String password, String firstName, String lastName, Date birthday) {
        super(email, password, firstName, lastName, birthday);
    }
}
