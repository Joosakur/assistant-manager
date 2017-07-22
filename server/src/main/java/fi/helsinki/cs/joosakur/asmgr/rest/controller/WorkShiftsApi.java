package fi.helsinki.cs.joosakur.asmgr.rest.controller;

import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.rest.model.error.ErrorResponse;
import fi.helsinki.cs.joosakur.asmgr.rest.model.workshift.WorkshiftGet;
import fi.helsinki.cs.joosakur.asmgr.rest.model.workshift.WorkshiftPost;
import io.swagger.annotations.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Api(value = "workshifts", description = "the workshifts API")
public interface WorkShiftsApi {

    @ApiOperation(value = "List workshifts", notes = "This endpoint is for listing workshifts. Either employerId or assistantId or both must be given as a parameter. If only employerId is given, the logged in user must be that employer. ",
            response = WorkshiftGet.class, responseContainer = "List", tags = {}, authorizations = {@Authorization(value = "basicAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Listing workshifts successful.", response = WorkshiftGet.class),
            @ApiResponse(code = 400, message = "Missing required parameter.", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "Authentication failed, should forward to login.", response = ErrorResponse.class),
            @ApiResponse(code = 403, message = "User was authenticated but is not authorized for the action.", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "Parameter referred to an unknown entity.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/workshifts",
            produces = {"application/json"},
            method = RequestMethod.GET)
    ResponseEntity<List<WorkshiftGet>> listWorkShifts(@NotNull @ApiParam(value = "from date", required = true) @RequestParam(value = "from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate from,
                                                      @NotNull @ApiParam(value = "to date", required = true) @RequestParam(value = "to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate to,
                                                      @ApiParam(value = "id of the assistant") @RequestParam(value = "assistantId", required = false) String assistantId) throws NotFoundException;


    @ApiOperation(value = "Delete workshift", notes = "This endpoint is for deleting a workshift. Needs to be logged in as the associated employer. ",
            response = Void.class, tags = {}, authorizations = {@Authorization(value = "basicAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "Workshift deleted.", response = Void.class),
            @ApiResponse(code = 401, message = "Authentication failed, should forward to login.", response = ErrorResponse.class),
            @ApiResponse(code = 403, message = "User was authenticated but is not authorized for the action.", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "Entity not found.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/workshifts/{id}",
            produces = {"application/json"},
            method = RequestMethod.DELETE)
    ResponseEntity<Void> deleteWorkShift(@ApiParam(value = "id of the workshift", required = true) @PathVariable("id") UUID id);


    @ApiOperation(value = "Update workshift", notes = "This endpoint is for updating a workshift. All data needs to be passed and will replace the existing data. Needs to be logged in as the associated employer. ",
            response = WorkshiftGet.class, tags = {}, authorizations = {@Authorization(value = "basicAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Workshift updated.", response = WorkshiftGet.class),
            @ApiResponse(code = 400, message = "Invalid data was sent on the request.", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "Authentication failed, should forward to login.", response = ErrorResponse.class),
            @ApiResponse(code = 403, message = "User was authenticated but is not authorized for the action.", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "Entity not found.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/workshifts/{id}",
            produces = {"application/json"},
            consumes = {"application/json"},
            method = RequestMethod.PUT)
    ResponseEntity<WorkshiftGet> updateWorkShift(@ApiParam(value = "id of the workshift", required = true) @PathVariable("id") UUID id,
                                                 @ApiParam(required = true) @RequestBody WorkshiftPost workshiftModel);


    @ApiOperation(value = "Create workshift", notes = "This endpoint is for creating a new workshift. The given assistant must be employed by the logged in user. ",
            response = WorkshiftGet.class, tags = {}, authorizations = {@Authorization(value = "basicAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Workshift created.", response = WorkshiftGet.class),
            @ApiResponse(code = 400, message = "Invalid data was sent on the request.", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "Authentication failed, should forward to login.", response = ErrorResponse.class),
            @ApiResponse(code = 403, message = "User was authenticated but is not authorized for the action.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/workshifts",
            produces = {"application/json"},
            consumes = {"application/json"},
            method = RequestMethod.POST)
    ResponseEntity<WorkshiftGet> createWorkShift(@ApiParam(required = true) @RequestBody WorkshiftPost workshiftModel);

}
