package fi.helsinki.cs.joosakur.asmgr.repository;

import fi.helsinki.cs.joosakur.asmgr.entity.WorkShift;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface WorkShiftRepository extends JpaRepository<WorkShift, UUID> {
}
