package fi.helsinki.cs.joosakur.repository;

import fi.helsinki.cs.joosakur.entity.Employer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EmployerRepository extends JpaRepository<Employer, UUID> {

    Employer findByEmail(String email);

}
