package fi.helsinki.cs.joosakur.service;

import fi.helsinki.cs.joosakur.entity.Employer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final EmployerService employerService;

    @Autowired
    public UserDetailsServiceImpl(EmployerService employerService) {
        this.employerService = employerService;
    }


    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Employer employer = employerService.findByEmail(s);

        if(employer == null)
            throw new UsernameNotFoundException("No user found with email: "+s);

        return employer;
    }
}
