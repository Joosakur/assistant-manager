package fi.helsinki.cs.joosakur.asmgr.repository;

import fi.helsinki.cs.joosakur.asmgr.entity.Export;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ExportRepository extends JpaRepository<Export, UUID> {
}
