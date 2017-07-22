package fi.helsinki.cs.joosakur.asmgr.rest.controller;

import fi.helsinki.cs.joosakur.asmgr.exception.AuthorizationException;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.rest.model.employer.EmployerGet;
import fi.helsinki.cs.joosakur.asmgr.rest.model.employer.EmployerPost;
import fi.helsinki.cs.joosakur.asmgr.rest.model.employer.EmployerPut;
import fi.helsinki.cs.joosakur.asmgr.rest.model.employer.PasswordChange;
import fi.helsinki.cs.joosakur.asmgr.rest.model.error.ErrorResponse;
import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Api(value = "employers", description = "the employers API")
public interface EmployersApi {

    @ApiOperation(value = "Create employer", notes = "This endpoint is for creating a new employer account. ",
            response = EmployerGet.class, tags = {})
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Employer created.", response = EmployerGet.class),
            @ApiResponse(code = 400, message = "Invalid data was sent on the request.", response = ErrorResponse.class)
    })
    @CrossOrigin
    @RequestMapping(value = "/employers",
            produces = {"application/json"},
            consumes = {"application/json"},
            method = RequestMethod.POST)
    ResponseEntity<EmployerGet> createEmployer(@ApiParam(required = true) @RequestBody EmployerPost employerModel);


    @ApiOperation(value = "Get employer", notes = "This endpoint is for retrieving the currently logged in employer. ",
            response = EmployerGet.class, tags = {}, authorizations = {@Authorization(value = "basicAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Employer found.", response = EmployerGet.class),
            @ApiResponse(code = 401, message = "Authentication failed, should forward to login.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/employers/self",
            produces = {"application/json"},
            method = RequestMethod.GET)
    ResponseEntity<EmployerGet> getEmployerSelf() throws NotFoundException;


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
    ResponseEntity<Void> changePassword(@ApiParam(required = true) @RequestBody PasswordChange passwordData) throws NotFoundException, AuthorizationException;


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
    ResponseEntity<EmployerGet> updateEmployer(@ApiParam(required = true) @RequestBody EmployerPut employerModel) throws NotFoundException;

}