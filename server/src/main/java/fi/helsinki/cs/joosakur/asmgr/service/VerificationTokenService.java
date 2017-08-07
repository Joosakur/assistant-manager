package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.entity.VerificationToken;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.exception.ResourceExpiredException;

import java.time.Duration;
import java.util.UUID;

public interface VerificationTokenService {
    VerificationToken create(VerificationToken.Target target, Employer employer, Duration expires);
    VerificationToken find(UUID id) throws ResourceExpiredException, NotFoundException;
    void consume(UUID id) throws NotFoundException;
}
