package fi.helsinki.cs.joosakur.service;

import fi.helsinki.cs.joosakur.entity.Assistant;
import fi.helsinki.cs.joosakur.exception.NotFoundException;
import fi.helsinki.cs.joosakur.repository.AssistantRepository;
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
    public Assistant findById(UUID id) throws NotFoundException {
        Assistant assistant = repository.findOne(id);
        if(assistant == null)
            throw new NotFoundException("No assistant found with id "+id.toString());
        return assistant;
    }

    @Override
    public List<Assistant> list() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Assistant create(Assistant assistant) {
        if(assistant.getId() != null)
            throw new IllegalArgumentException("Can not give id when creating a new entity, did you mean to update instead?");

        return repository.save(assistant);
    }

    @Override
    @Transactional
    public void update(Assistant assistant) throws NotFoundException {
        findById(assistant.getId()); //verify exists
        repository.save(assistant);
    }

    @Override
    @Transactional
    public void delete(UUID uuid) throws NotFoundException {
        if(uuid == null || !repository.exists(uuid))
            throw new NotFoundException("No assistant found with that id to delete.");

        repository.delete(uuid);
    }


}
