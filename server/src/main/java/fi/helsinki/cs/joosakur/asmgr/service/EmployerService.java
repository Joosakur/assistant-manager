package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;

import java.util.UUID;

public interface EmployerService {
    Employer create(Employer employer);
    Employer update(Employer employer) throws NotFoundException;
    Employer find(UUID id) throws NotFoundException;
    Employer findByEmail(String email) throws NotFoundException;
    void delete(UUID id) throws NotFoundException;
}
