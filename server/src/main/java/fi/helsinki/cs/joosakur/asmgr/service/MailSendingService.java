package fi.helsinki.cs.joosakur.asmgr.service;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.IOException;
import java.util.Map;

@Service
public class MailSendingService {

    private final JavaMailSender mailSender;

    private final Configuration freemarkerConfig;

    @Autowired
    public MailSendingService(JavaMailSender mailSender, Configuration freemarkerConfig) {
        this.mailSender = mailSender;
        this.freemarkerConfig = freemarkerConfig;
    }

    public void sendMailMessage(String from, String subject, String to, String templateName, Map<String, String> templateValues) {
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
                e.printStackTrace();
                throw new RuntimeException("Template not found.");
            } catch (TemplateException e) {
                e.printStackTrace();
                throw new RuntimeException("Template construction failed.");
            }
            message.setText(text, true);
        };

        this.mailSender.send(preparator);
    }
}
