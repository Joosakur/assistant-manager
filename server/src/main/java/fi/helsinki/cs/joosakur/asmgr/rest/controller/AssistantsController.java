package fi.helsinki.cs.joosakur.asmgr.rest.controller;

import fi.helsinki.cs.joosakur.asmgr.rest.model.assistant.AssistantGet;
import fi.helsinki.cs.joosakur.asmgr.rest.model.assistant.AssistantPost;
import fi.helsinki.cs.joosakur.asmgr.rest.model.assistant.AssistantPut;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.UUID;

@Controller
public class AssistantsController implements AssistantsApi {
    @Override
    public ResponseEntity<List<AssistantGet>> listMyAssistants() {
        return null;
    }

    @Override
    public ResponseEntity<Void> deleteAssistant(UUID id) {
        return null;
    }

    @Override
    public ResponseEntity<AssistantGet> getAssistant(UUID id) {
        return null;
    }

    @Override
    public ResponseEntity<AssistantGet> updateAssistant(UUID id, AssistantPut assistantModel) {
        return null;
    }

    @Override
    public ResponseEntity<AssistantGet> createAssistant(AssistantPost assistantModel) {
        return null;
    }
}
