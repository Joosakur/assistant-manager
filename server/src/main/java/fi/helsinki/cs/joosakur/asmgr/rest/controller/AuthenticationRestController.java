package fi.helsinki.cs.joosakur.asmgr.rest.controller;

import fi.helsinki.cs.joosakur.asmgr.exception.NotReadyException;
import fi.helsinki.cs.joosakur.asmgr.rest.model.auth.JwtAuthenticationRequest;
import fi.helsinki.cs.joosakur.asmgr.rest.model.auth.JwtAuthenticationResponse;
import fi.helsinki.cs.joosakur.asmgr.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthenticationRestController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @RequestMapping(value = "/login", method = RequestMethod.POST,
            consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public JwtAuthenticationResponse createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest, Device device) throws AuthenticationException, NotReadyException {

        // Perform the security
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Reload password post-security so we can generate token
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        if(!userDetails.isEnabled())
            throw new NotReadyException("Account is pending for verification, please check your email.");
        final String token = jwtTokenUtil.generateToken(userDetails, device);

        // Return the token
        return new JwtAuthenticationResponse(token);
    }

    /*
    @RequestMapping(value = "/login-refresh", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public JwtAuthenticationResponse refreshAndGetAuthenticationToken(HttpServletRequest request) throws ResourceExpiredException {
        String token = request.getHeader(tokenHeader);
        if (jwtTokenUtil.canTokenBeRefreshed(token)) {
            String refreshedToken = jwtTokenUtil.refreshToken(token);
            return new JwtAuthenticationResponse(refreshedToken);
        }
        throw new ResourceExpiredException("Can not refresh token");
    }
    */
}
