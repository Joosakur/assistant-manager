package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.entity.VerificationToken;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.exception.ResourceExpiredException;
import fi.helsinki.cs.joosakur.asmgr.repository.VerificationTokenRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class VerificationTokenServiceImpl implements VerificationTokenService {

    private final VerificationTokenRepository repository;

    public VerificationTokenServiceImpl(VerificationTokenRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public VerificationToken create(VerificationToken.Target target, Employer employer, Duration expires) {
        VerificationToken token = new VerificationToken();
        token.setTarget(target);
        token.setEmployer(employer);
        if(expires != null)
            token.setExpires(LocalDateTime.now().plus(expires));
        return repository.save(token);
    }

    @Override
    public VerificationToken find(UUID id) throws ResourceExpiredException, NotFoundException {
        VerificationToken token = repository.findOne(id);
        if(token == null)
            throw new NotFoundException("Token not found");
        if(token.isUsed() || (token.getExpires() != null && token.getExpires().isBefore(LocalDateTime.now())))
            throw new ResourceExpiredException("Token has expired or been already used");
        return token;
    }

    @Override
    @Transactional
    public void consume(UUID id) throws NotFoundException {
        VerificationToken token = repository.findOne(id);
        if(token == null)
            throw new NotFoundException("Token not found");
        token.setUsed(true);
        repository.save(token);
    }


}
