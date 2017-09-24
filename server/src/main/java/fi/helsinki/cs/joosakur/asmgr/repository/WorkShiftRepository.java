package fi.helsinki.cs.joosakur.asmgr.repository;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.entity.WorkShift;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface WorkShiftRepository extends JpaRepository<WorkShift, UUID> {
    List<WorkShift> findByEmployerAndStartsAfterAndEndsBefore(Employer employer, LocalDateTime from, LocalDateTime to);
    List<WorkShift> findByEmployerAndStartsBetween(Employer employer, LocalDateTime from, LocalDateTime to);
    List<WorkShift> findByAssistantAndStartsAfterAndEndsBefore(Assistant assistant, LocalDateTime from, LocalDateTime to);

}
