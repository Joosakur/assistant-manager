package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;

import java.util.List;
import java.util.UUID;

public interface AssistantService {
    Assistant create(Assistant assistant);
    Assistant update(Assistant assistant) throws NotFoundException;

    Assistant find(UUID id) throws NotFoundException;
    List<Assistant> listByEmployer(Employer employer) throws NotFoundException;

    void delete(UUID id) throws NotFoundException;
}
