package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.entity.WorkShift;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.repository.WorkShiftRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(WorkShiftServiceImpl.class);

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
        workShift = repository.save(workShift);

        logger.info("Created work shift {}", workShift.getId());
        return workShift;
    }

    @Override
    @Transactional
    public WorkShift update(WorkShift workShift) throws NotFoundException {
        if(workShift.getId() == null)
            throw new IllegalArgumentException("Must give id on update.");
        workShift = repository.save(workShift);
        logger.info("Work shift {} updated", workShift.getId());
        return workShift;
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
        return repository.findByEmployerAndStartsAfterAndEndsBefore(employer,
                from.atStartOfDay(),
                LocalDateTime.of(to, LocalTime.MAX));
    }


    @Override
    public List<WorkShift> listByEmployerAndStartDate(Employer employer, LocalDate startDate) {
        return repository.findByEmployerAndStartsBetween(employer,
                startDate.atStartOfDay(),
                LocalDateTime.of(startDate, LocalTime.MAX));
    }

    @Override
    public List<WorkShift> listByAssistantAndTime(Assistant assistant, LocalDate from, LocalDate to) {
        return repository.findByAssistantAndStartsAfterAndEndsBefore(assistant,
                from.atStartOfDay(),
                LocalDateTime.of(to, LocalTime.MAX));
    }

    @Override
    @Transactional
    public void delete(UUID id) throws NotFoundException {
        repository.delete(find(id));
        logger.info("Deleted work shift {}", id);
    }

    @Override
    @Transactional
    public List<WorkShift> copyDay(Employer employer, LocalDate from, LocalDate to) {
        List<WorkShift> workShifts = listByEmployerAndStartDate(employer, from);
        List<WorkShift> copies = new ArrayList<>();

        logger.info("Copying {} work shifts of employer {} from date {} to {}", workShifts.size(), employer.getId(), from, to);

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

        logger.info("Copying work shifts for employer {} was successful", employer.getId());

        return copies;
    }
}
