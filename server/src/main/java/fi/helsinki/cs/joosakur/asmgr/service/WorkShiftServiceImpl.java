package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.entity.WorkShift;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.repository.WorkShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class WorkShiftServiceImpl implements WorkShiftService {

    private final WorkShiftRepository repository;

    @Autowired
    public WorkShiftServiceImpl(WorkShiftRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public WorkShift create(WorkShift workShift) {
        if(workShift.getId() != null)
            throw new IllegalArgumentException("Can not give id on create.");
        return repository.save(workShift);
    }

    @Override
    @Transactional
    public WorkShift update(WorkShift workShift) throws NotFoundException {
        if(workShift.getId() == null)
            throw new IllegalArgumentException("Must give id on update.");
        return repository.save(workShift);
    }


    @Override
    public WorkShift find(UUID id) throws NotFoundException {
        WorkShift workShift = repository.findOne(id);
        if (workShift == null) {
            throw new NotFoundException("Work shift was not found.");
        }
        return workShift;
    }

    @Override
    public List<WorkShift> listByEmployerAndTime(Employer employer, LocalDate from, LocalDate to) {
        return repository.findByEmployerAndEndsAfterAndStartsBefore(employer,
                from.atStartOfDay(),
                LocalDateTime.of(to, LocalTime.MAX));
    }

    @Override
    public List<WorkShift> listByAssistantAndTime(Assistant assistant, LocalDate from, LocalDate to) {
        return repository.findByAssistantAndEndsAfterAndStartsBefore(assistant,
                from.atStartOfDay(),
                LocalDateTime.of(to, LocalTime.MAX));
    }

    @Override
    @Transactional
    public void delete(UUID id) throws NotFoundException {
        repository.delete(find(id));
    }

    @Override
    @Transactional
    public List<WorkShift> copyDay(Employer employer, LocalDate from, LocalDate to) {
        List<WorkShift> workShifts = listByEmployerAndTime(employer, from, from);
        List<WorkShift> copies = new ArrayList<>();

        for (WorkShift workShift : workShifts) {
            WorkShift copy = new WorkShift();
            copy.setEmployer(employer);
            copy.setAssistant(workShift.getAssistant());
            copy.setStarts(workShift.getStarts().withYear(to.getYear()).withDayOfYear(to.getDayOfYear()));
            copy.setEnds(workShift.getEnds().withYear(to.getYear()).withDayOfYear(to.getDayOfYear()));
            int dayDiff = (workShift.getEnds().getDayOfYear() - workShift.getStarts().getDayOfYear()) % 365;
            copy.setEnds(copy.getEnds().plusDays(dayDiff));
            copy.setSick(workShift.isSick());
            copies.add(create(copy));
        }

        return copies;
    }
}
