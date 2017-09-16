package fi.helsinki.cs.joosakur.asmgr.rest.controller;

import fi.helsinki.cs.joosakur.asmgr.exception.AuthorizationException;
import fi.helsinki.cs.joosakur.asmgr.exception.NotFoundException;
import fi.helsinki.cs.joosakur.asmgr.rest.model.assistant.AssistantGet;
import fi.helsinki.cs.joosakur.asmgr.rest.model.assistant.AssistantPost;
import fi.helsinki.cs.joosakur.asmgr.rest.model.error.ErrorResponse;
import io.swagger.annotations.*;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.UUID;

@Api(value = "assistants", description = "the assistants API")
public interface AssistantsApi {

    @ApiOperation(value = "List assistants", notes = "This endpoint is for listing assistants of the logged in employer.",
            response = AssistantGet.class, responseContainer = "List", tags = {}, authorizations = {@Authorization(value = "basicAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Listing assistants successful.", response = AssistantGet.class),
            @ApiResponse(code = 401, message = "Authentication failed, should forward to login.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/assistants",
            produces = {"application/json"},
            method = RequestMethod.GET)
    List<AssistantGet> listMyAssistants();


    @ApiOperation(value = "Delete assistant", notes = "This endpoint is for deleting an assistant and all related data. Needs to be logged in as an employer of that assistant.",
            response = Void.class, tags = {}, authorizations = {@Authorization(value = "basicAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "Assistant deleted.", response = Void.class),
            @ApiResponse(code = 401, message = "Authentication failed, should forward to login.", response = ErrorResponse.class),
            @ApiResponse(code = 403, message = "User was authenticated but is not authorized for the action.", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "Entity not found.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/assistants/{id}",
            produces = {"application/json"},
            method = RequestMethod.DELETE)
    void deleteAssistant(@ApiParam(value = "id of the assistant", required = true) @PathVariable("id") UUID id);


    @ApiOperation(value = "Get assistant", notes = "This endpoint is for finding a single assistant. Needs to be logged in  as an employer of that assistant. ",
            response = AssistantGet.class, tags = {}, authorizations = {@Authorization(value = "basicAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Assistant found.", response = AssistantGet.class),
            @ApiResponse(code = 401, message = "Authentication failed, should forward to login.", response = ErrorResponse.class),
            @ApiResponse(code = 403, message = "User was authenticated but is not authorized for the action.", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "Entity not found.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/assistants/{id}",
            produces = {"application/json"},
            method = RequestMethod.GET)
    AssistantGet getAssistant(@ApiParam(value = "id of the assistant", required = true) @PathVariable("id") UUID id);


    @ApiOperation(value = "List assistants", notes = "This endpoint is for listing active assistants employed by the same employer.",
            response = AssistantGet.class, responseContainer = "List", tags = {}, authorizations = {@Authorization(value = "basicAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Listing assistants successful.", response = AssistantGet.class),
            @ApiResponse(code = 403, message = "Authorization failed.", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "Entity not found.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/assistants/{id}/coworkers",
            produces = {"application/json"},
            method = RequestMethod.GET)
    List<AssistantGet> listActiveCoworkers(@ApiParam(value = "id of the assistant", required = true) @PathVariable("id") UUID id) throws NotFoundException, AuthorizationException;


    @ApiOperation(value = "Update assistant", notes = "This endpoint is for updating an assistant. All data needs to be passed and will replace the existing data. Needs to be logged in as an employer  of that assistant. ",
            response = AssistantGet.class, tags = {}, authorizations = {@Authorization(value = "basicAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Assistant updated.", response = AssistantGet.class),
            @ApiResponse(code = 400, message = "Invalid data was sent on the request.", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "Authentication failed, should forward to login.", response = ErrorResponse.class),
            @ApiResponse(code = 403, message = "User was authenticated but is not authorized for the action.", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "Entity not found.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/assistants/{id}",
            produces = {"application/json"},
            consumes = {"application/json"},
            method = RequestMethod.PUT)
    AssistantGet updateAssistant(@ApiParam(value = "id of the assistant", required = true) @PathVariable("id") UUID id,
                                                 @ApiParam(required = true) @RequestBody AssistantPost assistantModel) throws NotFoundException, AuthorizationException;


    @ApiOperation(value = "Create assistant", notes = "This endpoint is for creating a new assistant for the currently logged in employer. ",
            response = AssistantGet.class, tags = {}, authorizations = {@Authorization(value = "basicAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Assistant created.", response = AssistantGet.class),
            @ApiResponse(code = 400, message = "Invalid data was sent on the request.", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "Authentication failed, should forward to login.", response = ErrorResponse.class)
    })
    @RequestMapping(value = "/assistants",
            produces = {"application/json"},
            consumes = {"application/json"},
            method = RequestMethod.POST)
    AssistantGet createAssistant(@ApiParam(required = true) @RequestBody AssistantPost assistantModel);

}
