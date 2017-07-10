package fi.helsinki.cs.joosakur.asmgr.repository;

import fi.helsinki.cs.joosakur.asmgr.entity.User;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RepositoryEventHandler
public class UserEventHandler {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    @Autowired
    public UserEventHandler(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @HandleBeforeCreate
    public void handleUserCreate(User user) throws NotFoundException {
        System.out.println("creating user");
        if(user.getPassword() != null)
            user.setPassword(passwordEncoder.encode(user.getPassword()));
    }

    @HandleBeforeSave
    public void handleUserUpdate(User user) {
        if (user.getPassword() == null || user.getPassword().equals("")) {
            //keeps the last password
            User storedUser = userRepository.getOne(user.getId());
            user.setPassword(storedUser.getPassword());
        }
        else {
            //password change request
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
    }

}
