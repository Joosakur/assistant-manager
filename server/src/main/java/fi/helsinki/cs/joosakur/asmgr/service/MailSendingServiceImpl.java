package fi.helsinki.cs.joosakur.asmgr.service;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.IOException;
import java.util.Map;

@Service
@Profile({"!dev"})
public class MailSendingServiceImpl implements MailSendingService {

    private static final Logger logger = LoggerFactory.getLogger(MailSendingServiceImpl.class);

    private final JavaMailSender mailSender;

    private final Configuration freemarkerConfig;

    @Autowired
    public MailSendingServiceImpl(JavaMailSender mailSender, Configuration freemarkerConfig) {
        this.mailSender = mailSender;
        this.freemarkerConfig = freemarkerConfig;
    }

    @Override
    public void sendMailMessage(String from, String subject, String to, String templateName, Map<String, String> templateValues) {
        logger.debug("Sending email to {} with template {}", to, templateName);
        MimeMessagePreparator preparator = mimeMessage -> {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage);
            message.setFrom(from);
            message.setTo(to);
            message.setSubject(subject);
            String text;
            try {
                Template template = freemarkerConfig.getTemplate(templateName);
                text = FreeMarkerTemplateUtils.processTemplateIntoString(template, templateValues);
            } catch (IOException e) {
                logger.error("Template {} could not be read", templateName);
                throw new RuntimeException("Template not found.", e);
            } catch (TemplateException e) {
                logger.error("Template {} could not be constructed with values {}", templateName, templateValues);
                throw new RuntimeException("Template construction failed.", e);
            }
            message.setText(text, true);
        };

        this.mailSender.send(preparator);
        logger.info("Email sent to {} with template {}", to, templateName);
    }
}
