package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.repository.AssistantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
public class AssistantServiceImpl implements AssistantService {

    private final AssistantRepository repository;

    @Autowired
    public AssistantServiceImpl(AssistantRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public Assistant create(Assistant assistant) {
        if(assistant.getId() != null)
            throw new IllegalArgumentException("Can not give id on create.");
        return repository.save(assistant);
    }

    @Override
    @Transactional
    public Assistant update(Assistant assistant) throws NotFoundException {
        if(assistant.getId() == null)
            throw new IllegalArgumentException("Must give id on update.");
        return repository.save(assistant);
    }


    @Override
    public Assistant find(UUID id) throws NotFoundException {
        Assistant assistant = repository.findOne(id);
        if (assistant == null) {
            throw new NotFoundException("Assistant was not found.");
        }
        return assistant;
    }

    @Override
    public List<Assistant> listByEmployer(Employer employer) throws NotFoundException {
        return repository.findByEmployer(employer);
    }

    @Override
    @Transactional
    public void delete(UUID id) throws NotFoundException {
        repository.delete(find(id));
    }
}
