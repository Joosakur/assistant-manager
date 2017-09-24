package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.repository.AssistantRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
public class AssistantServiceImpl implements AssistantService {

    private static final Logger logger = LoggerFactory.getLogger(AssistantServiceImpl.class);

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
        assistant = repository.save(assistant);
        logger.info("Employer {} created an assistant {}.", assistant.getEmployer().getId(), assistant.getId());
        return assistant;
    }

    @Override
    @Transactional
    public Assistant update(Assistant assistant) throws NotFoundException {
        if(assistant.getId() == null)
            throw new IllegalArgumentException("Must give id on update.");
        assistant = repository.save(assistant);

        logger.info("Assistant {} was updated.", assistant.getId());
        return assistant;
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
    public List<Assistant> listByEmployer(Employer employer) {
        return repository.findByEmployer(employer);
    }

    @Override
    @Transactional
    public void delete(UUID id) throws NotFoundException {
        repository.delete(find(id));
        logger.info("Assistant {} was deleted.", id.toString());
    }
}
