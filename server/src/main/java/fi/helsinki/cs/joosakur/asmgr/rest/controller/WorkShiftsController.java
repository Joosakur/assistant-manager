package fi.helsinki.cs.joosakur.asmgr.rest.controller;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.entity.WorkShift;
import fi.helsinki.cs.joosakur.asmgr.exception.AuthorizationException;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.rest.model.workshift.WorkShiftGet;
import fi.helsinki.cs.joosakur.asmgr.rest.model.workshift.WorkShiftPost;
import fi.helsinki.cs.joosakur.asmgr.service.AssistantService;
import fi.helsinki.cs.joosakur.asmgr.service.EmployerService;
import fi.helsinki.cs.joosakur.asmgr.service.WorkShiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
public class WorkShiftsController implements WorkShiftsApi {

    private final EmployerService employerService;
    private final AssistantService assistantService;
    private final WorkShiftService workShiftService;

    @Autowired
    public WorkShiftsController(EmployerService employerService, AssistantService assistantService, WorkShiftService workShiftService) {
        this.employerService = employerService;
        this.assistantService = assistantService;
        this.workShiftService = workShiftService;
    }

    private Employer getAuthenticatedEmployer() throws NotFoundException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return employerService.findByEmail(email);
    }


    @Override
    @PreAuthorize("hasRole('EMPLOYER') or #assistantId != null ")
    @ResponseStatus(HttpStatus.OK)
    public List<WorkShiftGet> listWorkShifts(@RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate from,
                                             @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate to,
                                             @RequestParam(value = "assistantId", required = false) UUID assistantId)
            throws NotFoundException, AuthorizationException {

        Employer employer;
        if(assistantId == null) {
            employer = getAuthenticatedEmployer();
            if(employer == null)
                throw new AuthorizationException("You need to be logged in");
        }
        else {
            Assistant assistant = assistantService.find(assistantId);
            if(assistant == null || !assistant.isActive())
                throw new AuthorizationException("Not an active assistant, access denied.");
            employer = assistant.getEmployer();
        }
        List<WorkShift> workShifts = workShiftService.listByEmployerAndTime(employer, from, to);
        Stream<WorkShift> stream = workShifts.stream();
        if(assistantId!=null)
            stream = stream.filter(workShift -> !workShift.isSick());

        return stream
                .map(WorkShiftGet::newFromEntity)
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('EMPLOYER')")
    @ResponseStatus(HttpStatus.OK)
    public List<WorkShiftGet> listWorkShiftsForAssistant(@RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate from,
                                                         @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate to,
                                                         @RequestParam(value = "assistantId", required = false) String assistantId)
            throws NotFoundException
    {
        Employer employer = getAuthenticatedEmployer();
        List<WorkShift> workShifts = workShiftService.listByEmployerAndTime(employer, from, to);
        return workShifts.stream()
                .map(workShift -> new WorkShiftGet().fromEntity(workShift))
                .collect(Collectors.toList());
    }



    @Override
    @PreAuthorize("hasRole('EMPLOYER')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteWorkShift(@PathVariable("id") UUID id) throws NotFoundException, AuthorizationException {
        Employer employer = getAuthenticatedEmployer();
        WorkShift workShift = workShiftService.find(id);
        if(!workShift.getEmployer().equals(employer))
            throw new AuthorizationException("Not your work shift!");
        workShiftService.delete(id);
    }

    @Override
    @PreAuthorize("hasRole('EMPLOYER')")
    @ResponseStatus(HttpStatus.OK)
    public WorkShiftGet updateWorkShift(@PathVariable("id") UUID id, @RequestBody WorkShiftPost workShiftModel) throws NotFoundException, AuthorizationException {
        Employer employer = getAuthenticatedEmployer();
        WorkShift workShift = workShiftService.find(id);
        if(!workShift.getEmployer().equals(employer))
            throw new AuthorizationException("Not your work shift!");
        Assistant assistant = null;
        if(workShiftModel.getAssistantId() != null)
            assistant = assistantService.find(workShiftModel.getAssistantId());
        workShift.setAssistant(assistant);
        workShift.setStarts(workShiftModel.getStart());
        workShift.setEnds(workShiftModel.getEnd());
        workShift.setSick(workShiftModel.getSick());
        workShift = workShiftService.update(workShift);
        return new WorkShiftGet().fromEntity(workShift);
    }

    @Override
    @PreAuthorize("hasRole('EMPLOYER')")
    @ResponseStatus(HttpStatus.CREATED)
    public WorkShiftGet createWorkShift(@RequestBody @Valid WorkShiftPost workShiftModel) throws NotFoundException {
        Employer employer = getAuthenticatedEmployer();
        Assistant assistant = null;
        if(workShiftModel.getAssistantId() != null)
            assistant = assistantService.find(workShiftModel.getAssistantId());
        WorkShift workShift = new WorkShift(employer, assistant, workShiftModel.getStart(), workShiftModel.getEnd());
        workShift.setSick(workShiftModel.getSick());
        workShift = workShiftService.create(workShift);
        return new WorkShiftGet().fromEntity(workShift);
    }
}
