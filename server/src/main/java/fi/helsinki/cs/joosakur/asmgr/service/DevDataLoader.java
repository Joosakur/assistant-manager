package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.repository.AssistantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DevDataLoader implements CommandLineRunner {

    private final EmployerService employerService;
    private final AssistantRepository assistantRepository;

    @Autowired
    public DevDataLoader(EmployerService employerService, AssistantRepository assistantRepository) {
        this.employerService = employerService;
        this.assistantRepository = assistantRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        Employer employer = new Employer("joza.k.90@gmail.com", "oeoeoeoe", "Joosa", "Kurvinen", new Date());
        employer = employerService.create(employer);
        Assistant assistant = new Assistant(employer, "abc@gmail.com", "Avustaja", "Koivisto", new Date());
        assistantRepository.save(assistant);
    }
}
