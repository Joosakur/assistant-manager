package fi.helsinki.cs.joosakur.asmgr.service;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.IOException;
import java.util.Map;

@Service
@Profile({"dev"})
public class MailSendingServiceMockImpl implements MailSendingService {

    private static final Logger logger = LoggerFactory.getLogger(MailSendingServiceMockImpl.class);

    private final Configuration freemarkerConfig;

    @Autowired
    public MailSendingServiceMockImpl(Configuration freemarkerConfig) {
        this.freemarkerConfig = freemarkerConfig;
    }

    @Override
    public void sendMailMessage(String from, String subject, String to, String templateName, Map<String, String> templateValues) {
        logger.debug("Sending email to {} with template {}", to, templateName);
        try {
            Template template = freemarkerConfig.getTemplate(templateName);
            String text = FreeMarkerTemplateUtils.processTemplateIntoString(template, templateValues);
            logger.info("Email body: {}", text);
        } catch (IOException e) {
            logger.error("Template {} could not be read", templateName);
            throw new RuntimeException("Template not found.", e);
        } catch (TemplateException e) {
            logger.error("Template {} could not be constructed with values {}", templateName, templateValues);
            throw new RuntimeException("Template construction failed.", e);
        }

        logger.info("Email sent to {} with template {}", to, templateName);
    }
}
