package fi.helsinki.cs.joosakur.asmgr.repository;

import fi.helsinki.cs.joosakur.asmgr.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.UUID;

@RepositoryRestResource(exported = false)
public interface AdminRepository extends JpaRepository<Admin, UUID> {

}
