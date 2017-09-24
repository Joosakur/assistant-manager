package fi.helsinki.cs.joosakur.asmgr.test;

import org.springframework.context.annotation.Profile;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.io.InputStream;

@Service
@Profile("test")
public class JavaMailSenderMockImpl implements JavaMailSender {
    @Override
    public MimeMessage createMimeMessage() {
        return null;
    }

    @Override
    public MimeMessage createMimeMessage(InputStream inputStream) throws MailException {
        return null;
    }

    @Override
    public void send(MimeMessage mimeMessage) throws MailException {
        System.out.println("Sending mail");
    }

    @Override
    public void send(MimeMessage... mimeMessages) throws MailException {
        System.out.println("Sending "+mimeMessages.length+" mails");
    }

    @Override
    public void send(MimeMessagePreparator mimeMessagePreparator) throws MailException {
        System.out.println("Sending mail");
    }

    @Override
    public void send(MimeMessagePreparator... mimeMessagePreparators) throws MailException {
        System.out.println("Sending "+mimeMessagePreparators.length+" mails");
    }

    @Override
    public void send(SimpleMailMessage simpleMailMessage) throws MailException {
        System.out.println("Sending mail");
    }

    @Override
    public void send(SimpleMailMessage... simpleMailMessages) throws MailException {
        System.out.println("Sending "+simpleMailMessages.length+" mails");

    }
}
