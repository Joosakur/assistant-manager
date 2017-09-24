package fi.helsinki.cs.joosakur.asmgr.service;

import java.util.Map;

public interface MailSendingService {
    void sendMailMessage(String from, String subject, String to, String templateName, Map<String, String> templateValues);
}
