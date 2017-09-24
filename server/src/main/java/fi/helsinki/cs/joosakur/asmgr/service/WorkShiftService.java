package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.entity.WorkShift;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface WorkShiftService {
    WorkShift create(WorkShift workShift);
    WorkShift update(WorkShift workShift) throws NotFoundException;

    WorkShift find(UUID id) throws NotFoundException;
    List<WorkShift> listByEmployerAndTime(Employer employer, LocalDate from, LocalDate to);

    List<WorkShift> listByEmployerAndStartDate(Employer employer, LocalDate startDate);

    List<WorkShift> listByAssistantAndTime(Assistant assistant, LocalDate from, LocalDate to);

    void delete(UUID id) throws NotFoundException;

    List<WorkShift> copyDay(Employer employer, LocalDate from, LocalDate to);
}
