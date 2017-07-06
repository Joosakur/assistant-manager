package fi.helsinki.cs.joosakur.service;

import fi.helsinki.cs.joosakur.entity.Employer;
import fi.helsinki.cs.joosakur.exception.AuthorizationException;
import fi.helsinki.cs.joosakur.exception.NotFoundException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

public interface EmployerService {

    Employer findById(UUID id) throws NotFoundException;

    Employer findByEmail(String email);

    List<Employer> list();

    Employer create(Employer employer);

    void update(Employer employer) throws NotFoundException;

    @Transactional
    void changePassword(UUID employerId, String oldPassword, String newPassword)
            throws NotFoundException, AuthorizationException;

    void delete(UUID uuid) throws NotFoundException;
}
