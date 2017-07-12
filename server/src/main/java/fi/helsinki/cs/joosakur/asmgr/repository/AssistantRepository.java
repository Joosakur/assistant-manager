package fi.helsinki.cs.joosakur.asmgr.repository;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AssistantRepository extends JpaRepository<Assistant, UUID> {
}
