package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Admin;
import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.repository.AdminRepository;
import fi.helsinki.cs.joosakur.asmgr.repository.AssistantRepository;
import fi.helsinki.cs.joosakur.asmgr.repository.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DevDataLoader implements CommandLineRunner {

    private final PasswordEncoder passwordEncoder;
    private final AdminRepository adminRepository;
    private final EmployerRepository employerRepository;
    private final AssistantRepository assistantRepository;

    @Autowired
    public DevDataLoader(PasswordEncoder passwordEncoder, AdminRepository adminRepository, EmployerRepository employerRepository, AssistantRepository assistantRepository) {
        this.passwordEncoder = passwordEncoder;
        this.adminRepository = adminRepository;
        this.employerRepository = employerRepository;
        this.assistantRepository = assistantRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        Admin admin = new Admin("admin@asmgr.com", "insecure", "Admin", "Admin", new Date());
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        adminRepository.save(admin);

        Employer employer = new Employer("joza.k.90@gmail.com", "oeoeoeoe", "Joosa", "Kurvinen", new Date());
        employer.setPassword(passwordEncoder.encode(employer.getPassword()));
        Assistant assistant = new Assistant(employer, "abc@gmail.com", "Avustaja", "Koivisto", "Koukku", new Date());
        employer.getAssistants().add(assistant);
        employerRepository.save(employer);


    }
}
