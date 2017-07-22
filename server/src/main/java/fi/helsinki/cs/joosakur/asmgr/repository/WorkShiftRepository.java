package fi.helsinki.cs.joosakur.asmgr.repository;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.entity.WorkShift;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface WorkShiftRepository extends JpaRepository<WorkShift, UUID> {

    List<WorkShift> findByEmployer(Employer employer);
    List<WorkShift> findByEmployerAndEndsAfterAndStartsBefore(Employer employer, LocalDateTime from, LocalDateTime to);
    List<WorkShift> findByAssistantAndEndsAfterAndStartsBefore(Assistant assistant, LocalDateTime from, LocalDateTime to);

}
