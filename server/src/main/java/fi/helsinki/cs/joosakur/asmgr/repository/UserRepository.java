package fi.helsinki.cs.joosakur.asmgr.repository;

import fi.helsinki.cs.joosakur.asmgr.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    User findByEmail(String email);

    
}
