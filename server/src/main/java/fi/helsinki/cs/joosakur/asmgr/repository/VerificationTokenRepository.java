package fi.helsinki.cs.joosakur.asmgr.repository;

import fi.helsinki.cs.joosakur.asmgr.entity.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, UUID> {

}
