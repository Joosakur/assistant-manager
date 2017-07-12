package fi.helsinki.cs.joosakur.asmgr.security;

import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.repository.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceJwtImpl implements UserDetailsService {

    private final EmployerRepository repository;

    @Autowired
    public UserDetailsServiceJwtImpl(EmployerRepository repository) {
        this.repository = repository;
    }


    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Employer employer = repository.findByEmail(s);

        if(employer == null)
            throw new UsernameNotFoundException("No user found with email: "+s);

        return employer;
    }
}
