package fi.helsinki.cs.joosakur.asmgr.rest.controller;

import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.entity.WorkShift;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.rest.model.workshift.WorkshiftGet;
import fi.helsinki.cs.joosakur.asmgr.rest.model.workshift.WorkshiftPost;
import fi.helsinki.cs.joosakur.asmgr.service.AssistantService;
import fi.helsinki.cs.joosakur.asmgr.service.EmployerService;
import fi.helsinki.cs.joosakur.asmgr.service.WorkShiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Controller
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
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<List<WorkshiftGet>> listWorkShifts(@RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate from,
                                                             @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate to,
                                                             @RequestParam(value = "assistantId", required = false) String assistantId)
            throws NotFoundException
    {
        Employer employer = getAuthenticatedEmployer();
        List<WorkShift> workShifts = workShiftService.listByEmployerAndTime(employer, from, to);
        List<WorkshiftGet> response = new ArrayList<>(workShifts.size());
        for (WorkShift workShift : workShifts) {
            response.add(new WorkshiftGet().fromEntity(workShift));
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> deleteWorkShift(UUID id) {
        return null;
    }

    @Override
    public ResponseEntity<WorkshiftGet> updateWorkShift(UUID id, WorkshiftPost workshiftModel) {
        return null;
    }

    @Override
    public ResponseEntity<WorkshiftGet> createWorkShift(WorkshiftPost workshiftModel) {
        return null;
    }
}
