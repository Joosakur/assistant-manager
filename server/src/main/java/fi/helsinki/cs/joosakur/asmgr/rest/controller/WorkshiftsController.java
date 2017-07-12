package fi.helsinki.cs.joosakur.asmgr.rest.controller;

import fi.helsinki.cs.joosakur.asmgr.rest.model.workshift.WorkshiftGet;
import fi.helsinki.cs.joosakur.asmgr.rest.model.workshift.WorkshiftPost;
import org.joda.time.LocalDate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.UUID;

@Controller
public class WorkshiftsController implements WorkshiftsApi {
    @Override
    public ResponseEntity<List<WorkshiftGet>> listWorkshifts(LocalDate from, LocalDate to, UUID employerId, UUID assistantId) {
        return null;
    }

    @Override
    public ResponseEntity<Void> deleteWorkshift(UUID id) {
        return null;
    }

    @Override
    public ResponseEntity<WorkshiftGet> updateWorkshift(UUID id, WorkshiftPost workshiftModel) {
        return null;
    }

    @Override
    public ResponseEntity<WorkshiftGet> createWorkshift(WorkshiftPost workshiftModel) {
        return null;
    }
}
