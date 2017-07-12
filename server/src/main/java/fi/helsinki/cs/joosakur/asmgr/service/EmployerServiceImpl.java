package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.repository.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
    @Transactional
    public Employer create(Employer employer) {
        if(employer.getId() != null)
            throw new IllegalArgumentException("Can not give id on create.");
        employer.setPassword(passwordEncoder.encode(employer.getPassword()));
        return repository.save(employer);
    }

    @Override
    public Employer update(Employer employer) throws NotFoundException {
        if(employer.getId() == null)
            throw new IllegalArgumentException("Must give id on update.");
        Employer old = find(employer.getId());
        employer.setPassword(old.getPassword());
        return repository.save(employer);
    }

    @Override
    public Employer find(UUID id) throws NotFoundException {
        Employer employer = repository.findOne(id);
        if (employer == null) {
            throw new NotFoundException("Employer was not found.");
        }
        return employer;
    }

    @Override
    public Employer findByEmail(String email) throws NotFoundException {
        Employer employer = repository.findByEmail(email);
        if (employer == null) {
            throw new NotFoundException("Employer was not found.");
        }
        return employer;
    }

    @Override
    public void delete(UUID id) throws NotFoundException {
        repository.delete(find(id));
    }
}
