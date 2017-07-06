package fi.helsinki.cs.joosakur.service;

import fi.helsinki.cs.joosakur.entity.Employer;
import fi.helsinki.cs.joosakur.exception.AuthorizationException;
import fi.helsinki.cs.joosakur.exception.NotFoundException;
import fi.helsinki.cs.joosakur.repository.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
public class EmployerServiceImpl implements EmployerService {

    private final EmployerRepository repository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public EmployerServiceImpl(EmployerRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Employer findById(UUID id) throws NotFoundException {
        Employer employer = repository.findOne(id);
        if(employer == null)
            throw new NotFoundException("No employer found with id "+id.toString());
        return employer;
    }

    @Override
    public Employer findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public List<Employer> list() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Employer create(Employer employer) {
        if(employer.getId() != null)
            throw new IllegalArgumentException("Can not give id when creating a new entity, did you mean to update instead?");

        String passwordHash = passwordEncoder.encode(employer.getPassword());
        employer.setPassword(passwordHash);

        return repository.save(employer);
    }

    @Override
    @Transactional
    public void update(Employer employer) throws NotFoundException {
        Employer old = findById(employer.getId());
        employer.setPassword(old.getPassword());
        repository.save(employer);
    }

    @Override
    @Transactional
    public void changePassword(UUID employerId, String oldPassword, String newPassword)
            throws NotFoundException, AuthorizationException {
        Employer employer = findById(employerId);
        if (!passwordEncoder.matches(oldPassword, employer.getPassword()))
            throw new AuthorizationException("Old password did not match");

        employer.setPassword(passwordEncoder.encode(newPassword));
        repository.save(employer);
    }



    @Override
    @Transactional
    public void delete(UUID uuid) throws NotFoundException {
        if(uuid == null || !repository.exists(uuid))
            throw new NotFoundException("No employer found with that id to delete.");

        repository.delete(uuid);
    }


}
