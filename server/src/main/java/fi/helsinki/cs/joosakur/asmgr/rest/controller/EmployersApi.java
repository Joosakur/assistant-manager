package fi.helsinki.cs.joosakur.asmgr.rest.controller;

import fi.helsinki.cs.joosakur.asmgr.exception.*;
import fi.helsinki.cs.joosakur.asmgr.rest.model.employer.EmployerGet;
import fi.helsinki.cs.joosakur.asmgr.rest.model.employer.EmployerPost;
import fi.helsinki.cs.joosakur.asmgr.rest.model.employer.EmployerPut;
import fi.helsinki.cs.joosakur.asmgr.rest.model.employer.PasswordChange;
import fi.helsinki.cs.joosakur.asmgr.rest.model.error.ErrorResponse;
import io.swagger.annotations.*;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

@Api(value = "employers", description = "the employers API")
public interface EmployersApi {

    @ApiOperation(value = "Create employer", notes = "This endpoint is for creating a new employer account. ",
            response = EmployerGet.class, tags = {})
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Employer created.", response = EmployerGet.class),
            @ApiResponse(code = 400, message = "Invalid data was sent on the request.", response = ErrorResponse.class),
            @ApiResponse(code = 409, message = "An enabled employer with same email already exists.", response = ErrorResponse.class)
    })
    @CrossOrigin
    @RequestMapping(value = "/employers",
            produces = {"application/json"},
            consumes = {"application/json"},
            method = RequestMethod.POST)
    EmployerGet createEmployer(@ApiParam(required = true) @RequestBody EmployerPost employerPost) throws NotUniqueException;


    @ApiOperation(value = "Get employer", notes = "This endpoint is for retrieving the currently logged in employer. ",
            response = EmployerGet.class, tags = {}, authorizations = {@Authorization(value = "basicAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Employer found.", response = EmployerGet.class),
            @ApiResponse(code = 401, message = "Authentication failed, should forward to login.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/employers/self",
            produces = {"application/json"},
            method = RequestMethod.GET)
    EmployerGet getEmployerSelf() throws NotFoundException;


    @ApiOperation(value = "Change password", notes = "This endpoint is for changing the password of the currently logged in employer. ",
            response = Void.class, tags = {}, authorizations = {@Authorization(value = "basicAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "Password changed.", response = Void.class),
            @ApiResponse(code = 400, message = "Invalid data was sent on the request.", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "Authentication failed, should forward to login.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/employers/self/password",
            produces = {"application/json"},
            consumes = {"application/json"},
            method = RequestMethod.POST)
    void changePassword(@ApiParam(required = true) @RequestBody PasswordChange passwordChange, Errors errors) throws NotFoundException, LateValidationException;


    @ApiOperation(value = "Update employer", notes = "This endpoint is for updating the currently logged in employer. All data except password needs to be passed and will replace the existing data. ",
            response = EmployerGet.class, tags = {}, authorizations = {@Authorization(value = "basicAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Employer updated.", response = EmployerGet.class),
            @ApiResponse(code = 400, message = "Invalid data was sent on the request.", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "Authentication failed, should forward to login.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/employers/self",
            produces = {"application/json"},
            consumes = {"application/json"},
            method = RequestMethod.PUT)
    EmployerGet updateEmployer(@ApiParam(required = true) @RequestBody EmployerPut employerUpdateModel) throws NotFoundException;

    @ApiOperation(value = "Verify employer account", notes = "This endpoint is for verifying email and activating newly created account.",
            response = Void.class, tags = {})
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "Account verified.", response = Void.class),
            @ApiResponse(code = 403, message = "Invalid token.", response = ErrorResponse.class),
            @ApiResponse(code = 410, message = "Token no longer valid.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/employers/verify",
            produces = {"application/json"},
            method = RequestMethod.POST)
    void verify(@ApiParam(required = true) @RequestParam("token") String token) throws AuthorizationException, ResourceExpiredException;
}
