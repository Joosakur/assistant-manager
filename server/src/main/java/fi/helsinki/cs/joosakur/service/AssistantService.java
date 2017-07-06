package fi.helsinki.cs.joosakur.service;

import fi.helsinki.cs.joosakur.entity.Assistant;
import fi.helsinki.cs.joosakur.exception.NotFoundException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

public interface AssistantService {

    Assistant findById(UUID id) throws NotFoundException;

    List<Assistant> list();

    Assistant create(Assistant assistant);

    @Transactional
    void update(Assistant assistant) throws NotFoundException;

    @Transactional
    void delete(UUID uuid) throws NotFoundException;
}
