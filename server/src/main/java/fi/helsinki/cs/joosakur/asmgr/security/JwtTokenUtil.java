package fi.helsinki.cs.joosakur.asmgr.security;

import fi.helsinki.cs.joosakur.asmgr.common.utils.TimeProvider;
import fi.helsinki.cs.joosakur.asmgr.config.properties.AppConfig;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenUtil implements Serializable {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenUtil.class);
    private static final long serialVersionUID = -3301605591108950415L;

    static final String CLAIM_KEY_USERNAME = Claims.SUBJECT;
    static final String CLAIM_KEY_AUDIENCE = "audience";
    static final String CLAIM_KEY_CREATED = "created";

    static final String AUDIENCE_UNKNOWN = "unknown";
    static final String AUDIENCE_WEB = "web";
    static final String AUDIENCE_MOBILE = "mobile";
    static final String AUDIENCE_TABLET = "tablet";

    @Autowired
    private TimeProvider timeProvider;

    @Autowired
    private AppConfig appConfig;

    public String getUsernameFromToken(String token) {
        final Claims claims = getClaimsFromToken(token);
        return claims.getSubject();
    }

    public Date getCreatedDateFromToken(String token) {
        final Claims claims = getClaimsFromToken(token);
        return new Date((Long) claims.get(CLAIM_KEY_CREATED));
    }

    public Date getExpirationDateFromToken(String token) throws AuthenticationException {
        final Claims claims = getClaimsFromToken(token);
        return claims.getExpiration();
    }

    public String getAudienceFromToken(String token) throws AuthenticationException {
        final Claims claims = getClaimsFromToken(token);
        return (String) claims.get(CLAIM_KEY_AUDIENCE);
    }

    private Claims getClaimsFromToken(String token) throws AuthenticationException {
        try {
            return Jwts.parser()
                    .setSigningKey(appConfig.getJwt().getSecret())
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new InsufficientAuthenticationException("Token has expired");
        } catch (UnsupportedJwtException | MalformedJwtException | SignatureException e) {
            logger.warn("Possible attack, token was not valid jwt: {}", token);
            throw new InsufficientAuthenticationException("Token could not be parsed");
        }
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(timeProvider.now());
    }

    private String generateAudience(Device device) {
        String audience = AUDIENCE_UNKNOWN;
        if (device.isNormal()) {
            audience = AUDIENCE_WEB;
        } else if (device.isTablet()) {
            audience = AUDIENCE_TABLET;
        } else if (device.isMobile()) {
            audience = AUDIENCE_MOBILE;
        }
        return audience;
    }

    public String generateToken(UserDetails userDetails, Device device) {
        Map<String, Object> claims = new HashMap<>();

        claims.put(CLAIM_KEY_USERNAME, userDetails.getUsername());
        claims.put(CLAIM_KEY_AUDIENCE, generateAudience(device));

        final Date createdDate = timeProvider.now();
        claims.put(CLAIM_KEY_CREATED, createdDate);

        return doGenerateToken(claims);
    }

    private String doGenerateToken(Map<String, Object> claims) {
        final Date createdDate = (Date) claims.get(CLAIM_KEY_CREATED);
        final Date expirationDate = new Date(createdDate.getTime() + appConfig.getJwt().getExpiration() * 1000);

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, appConfig.getJwt().getSecret())
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        Employer user = (Employer) userDetails;
        final String username = getUsernameFromToken(token);
        return (username.equals(user.getUsername()) && !isTokenExpired(token));
    }
}