package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.exception.AuthorizationException;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.exception.NotUniqueException;
import fi.helsinki.cs.joosakur.asmgr.exception.ResourceExpiredException;

import java.util.UUID;

public interface EmployerService {
    Employer create(Employer employer, boolean autoEnabled) throws NotUniqueException;
    Employer update(Employer employer) throws NotFoundException;

    Employer changePassword(UUID id, String oldPassword, String newPassword) throws NotFoundException;

    Employer find(UUID id) throws NotFoundException;
    Employer findByEmail(String email) throws NotFoundException;
    void delete(UUID id) throws NotFoundException;

    void verifyAccount(String tokenB64) throws AuthorizationException, ResourceExpiredException;
}
