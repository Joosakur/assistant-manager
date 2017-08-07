package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.config.properties.AppConfig;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.entity.VerificationToken;
import fi.helsinki.cs.joosakur.asmgr.exception.AuthorizationException;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.exception.ResourceExpiredException;
import fi.helsinki.cs.joosakur.asmgr.repository.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class EmployerServiceImpl implements EmployerService {

    private final EmployerRepository repository;

    private final PasswordEncoder passwordEncoder;

    private final MailSendingService mailSendingService;

    private final VerificationTokenService tokenService;

    private final AppConfig appConfig;

    @Autowired
    public EmployerServiceImpl(EmployerRepository repository, PasswordEncoder passwordEncoder, MailSendingService mailSendingService, VerificationTokenService tokenService, AppConfig appConfig) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.mailSendingService = mailSendingService;
        this.tokenService = tokenService;
        this.appConfig = appConfig;
    }

    @Override
    @Transactional
    public Employer create(Employer employer, boolean autoEnabled) {
        if(employer.getId() != null)
            throw new IllegalArgumentException("Can not give id on create.");
        employer.setPassword(passwordEncoder.encode(employer.getPassword()));
        employer.setEnabled(autoEnabled);
        employer = repository.save(employer);

        if(!autoEnabled) {
            VerificationToken token = tokenService.create(VerificationToken.Target.NEW_ACCOUNT, employer, null);
            String tokenB64 = Base64.getEncoder().encodeToString(token.getId().toString().getBytes());
            String link = appConfig.getGuiOrigin()+"/verify-account?token="+tokenB64;
            Map<String, String> model = new HashMap<>();
            model.put("firstName", employer.getFirstName());
            model.put("link", link);

            mailSendingService.sendMailMessage(
                    "noreply@assistant-manager.joosa.net",
                    "Assistant Manager email verification",
                    employer.getEmail(),
                    "verify-email.ftl",
                    model
            );
        }

        return employer;
    }

    @Override
    @Transactional
    public Employer update(Employer employer) throws NotFoundException {
        if(employer.getId() == null)
            throw new IllegalArgumentException("Must give id on update.");
        Employer old = find(employer.getId());
        employer.setPassword(old.getPassword());
        return repository.save(employer);
    }

    @Override
    @Transactional
    public Employer changePassword(UUID id, String oldPassword, String newPassword) throws NotFoundException, AuthorizationException {
        Employer employer = find(id);
        if(!passwordEncoder.matches(employer.getPassword(), oldPassword))
            throw new AuthorizationException("Old password did not match");
        employer.setPassword(passwordEncoder.encode(newPassword));
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
    @Transactional
    public void delete(UUID id) throws NotFoundException {
        repository.delete(find(id));
    }

    @Override
    @Transactional
    public void verifyAccount(String tokenB64) throws AuthorizationException, ResourceExpiredException {
        UUID tokenId;
        try {
            tokenId = UUID.fromString(new String(Base64.getDecoder().decode(tokenB64)));
        }
        catch (Throwable e) {
            throw new AuthorizationException("Invalid token");
        }
        VerificationToken token;
        try {
            token = tokenService.find(tokenId);
        } catch (NotFoundException e) {
            throw new AuthorizationException(e.getMessage());
        }
        Employer employer = token.getEmployer();
        if(!employer.isEnabled()) {
            employer.setEnabled(true);
            repository.save(employer);
        }
        try {
            tokenService.consume(tokenId);
        } catch (NotFoundException e) {
            e.printStackTrace();
            //doesn't really matter
        }
    }
}
