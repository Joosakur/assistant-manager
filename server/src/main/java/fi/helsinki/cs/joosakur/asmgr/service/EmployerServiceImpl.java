package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.config.properties.AppConfig;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.entity.VerificationToken;
import fi.helsinki.cs.joosakur.asmgr.exception.AuthorizationException;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.exception.NotUniqueException;
import fi.helsinki.cs.joosakur.asmgr.exception.ResourceExpiredException;
import fi.helsinki.cs.joosakur.asmgr.repository.EmployerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class EmployerServiceImpl implements EmployerService {

    private static final Logger logger = LoggerFactory.getLogger(EmployerServiceImpl.class);

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
    @Transactional(rollbackOn = Exception.class)
    public Employer create(Employer employer, boolean autoEnabled) throws NotUniqueException {
        try {
            Employer existingEmployer = findByEmail(employer.getEmail());
            if (existingEmployer.isEnabled()) {
                throw new NotUniqueException("An account already exists with this email");
            } else {
                delete(existingEmployer.getId());
                repository.flush();
            }
        } catch (NotFoundException e) {
            // ok
        }

        logger.debug("Starting employer creation for email {}}", employer.getEmail());
        if(employer.getId() != null)
            throw new IllegalArgumentException("Can not give id on create.");
        employer.setPassword(passwordEncoder.encode(employer.getPassword()));
        employer.setEnabled(autoEnabled);
        employer = repository.save(employer);

        if(!autoEnabled) {
            logger.debug("Generating account verification link for employer {}", employer.getEmail());
            VerificationToken token = tokenService.create(VerificationToken.Target.NEW_ACCOUNT, employer, null);
            String link = appConfig.getGuiOrigin()+"/verify-account?token="+token.getId();
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
            logger.info("Account verification email sent to {}", employer.getId(), employer.getEmail());
        }

        logger.info("Employer {} saved with id {}", employer.getEmail(), employer.getId());
        return employer;
    }

    @Override
    @Transactional
    public Employer update(Employer employer) throws NotFoundException {
        if(employer.getId() == null)
            throw new IllegalArgumentException("Must give id on update.");
        Employer old = find(employer.getId());
        employer.setPassword(old.getPassword());
        employer = repository.save(employer);

        logger.info("Employer {} updated", employer.getId());
        return employer;
    }

    @Override
    @Transactional
    public Employer changePassword(UUID id, String oldPassword, String newPassword) throws NotFoundException {
        Employer employer = find(id);
        employer.setPassword(passwordEncoder.encode(newPassword));
        employer = repository.save(employer);

        logger.info("Employer {} password changed", employer.getId());
        return employer;
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
        logger.info("Employer {} deleted", id.toString());
    }

    @Override
    @Transactional
    public void verifyAccount(String tokenString) throws AuthorizationException, ResourceExpiredException {
        UUID tokenId;
        try {
            tokenId = UUID.fromString(tokenString);
            VerificationToken token = tokenService.find(tokenId);
            Employer employer = token.getEmployer();
            if(!employer.isEnabled()) {
                employer.setEnabled(true);
                repository.save(employer);
            }

        }
        catch (IllegalArgumentException | NotFoundException e) {
            throw new AuthorizationException("Invalid token "+tokenString);
        }

        try {
            tokenService.consume(tokenId);
        } catch (NotFoundException e) {
            //weird, but doesn't really matter
            logger.debug("Tried to consume a non existing token {}", tokenId.toString());
        }
    }
}
