package fi.helsinki.cs.joosakur.repository;

import fi.helsinki.cs.joosakur.entity.Assistant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AssistantRepository extends JpaRepository<Assistant, UUID> {
}
