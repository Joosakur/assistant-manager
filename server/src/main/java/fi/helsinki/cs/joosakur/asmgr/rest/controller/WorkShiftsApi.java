package fi.helsinki.cs.joosakur.asmgr.rest.controller;

import fi.helsinki.cs.joosakur.asmgr.exception.AuthorizationException;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.rest.model.error.ErrorResponse;
import fi.helsinki.cs.joosakur.asmgr.rest.model.workshift.WorkShiftGet;
import fi.helsinki.cs.joosakur.asmgr.rest.model.workshift.WorkShiftPost;
import io.swagger.annotations.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Api(value = "work shifts", description = "the work shifts API")
public interface WorkShiftsApi {

    @ApiOperation(value = "List work shifts", notes = "This endpoint is for listing work shifts. Either employerId or assistantId or both must be given as a parameter. If only employerId is given, the logged in user must be that employer. ",
            response = WorkShiftGet.class, responseContainer = "List", tags = {}, authorizations = {@Authorization(value = "basicAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Listing work shifts successful.", response = WorkShiftGet.class),
            @ApiResponse(code = 400, message = "Missing required parameter.", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "Authentication failed, should forward to login.", response = ErrorResponse.class),
            @ApiResponse(code = 403, message = "User was authenticated but is not authorized for the action.", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "Parameter referred to an unknown entity.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/work-shifts",
            produces = {"application/json"},
            method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    List<WorkShiftGet> listWorkShifts(@NotNull @ApiParam(value = "from date", required = true) @RequestParam(value = "from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate from,
                                                      @NotNull @ApiParam(value = "to date", required = true) @RequestParam(value = "to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate to,
                                                      @ApiParam(value = "id of the assistant") @RequestParam(value = "assistantId", required = false) UUID assistantId) throws NotFoundException, AuthorizationException;


    @ApiOperation(value = "Delete work shift", notes = "This endpoint is for deleting a work shift. Needs to be logged in as the associated employer. ",
            response = Void.class, tags = {}, authorizations = {@Authorization(value = "basicAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "Work shift deleted.", response = Void.class),
            @ApiResponse(code = 401, message = "Authentication failed, should forward to login.", response = ErrorResponse.class),
            @ApiResponse(code = 403, message = "User was authenticated but is not authorized for the action.", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "Entity not found.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/work-shifts/{id}",
            produces = {"application/json"},
            method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteWorkShift(@ApiParam(value = "id of the work shift", required = true) @PathVariable("id") UUID id) throws NotFoundException, AuthorizationException;


    @ApiOperation(value = "Update work shift", notes = "This endpoint is for updating a work shift. All data needs to be passed and will replace the existing data. Needs to be logged in as the associated employer. ",
            response = WorkShiftGet.class, tags = {}, authorizations = {@Authorization(value = "basicAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Work shift updated.", response = WorkShiftGet.class),
            @ApiResponse(code = 400, message = "Invalid data was sent on the request.", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "Authentication failed, should forward to login.", response = ErrorResponse.class),
            @ApiResponse(code = 403, message = "User was authenticated but is not authorized for the action.", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "Entity not found.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/work-shifts/{id}",
            produces = {"application/json"},
            consumes = {"application/json"},
            method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    WorkShiftGet updateWorkShift(@ApiParam(value = "id of the work shift", required = true) @PathVariable("id") UUID id,
                                                 @ApiParam(required = true) @RequestBody WorkShiftPost workShiftModel) throws NotFoundException, AuthorizationException;


    @ApiOperation(value = "Create work shift", notes = "This endpoint is for creating a new work shift. The given assistant must be employed by the logged in user. ",
            response = WorkShiftGet.class, tags = {}, authorizations = {@Authorization(value = "basicAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Work shift created.", response = WorkShiftGet.class),
            @ApiResponse(code = 400, message = "Invalid data was sent on the request.", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "Authentication failed, should forward to login.", response = ErrorResponse.class),
            @ApiResponse(code = 403, message = "User was authenticated but is not authorized for the action.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/work-shifts",
            produces = {"application/json"},
            consumes = {"application/json"},
            method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @CrossOrigin
    WorkShiftGet createWorkShift(@ApiParam(required = true) @RequestBody WorkShiftPost workShiftModel) throws NotFoundException;

}
