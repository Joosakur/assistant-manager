package fi.helsinki.cs.joosakur.service;

import fi.helsinki.cs.joosakur.entity.Employer;
import fi.helsinki.cs.joosakur.test.TestUtils;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.Date;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@Transactional
public class EmployerServiceIntegrationTest {

    @Autowired
    private EmployerService employerService;

    @Test
    public void testCreation() {
        Employer employer = testEmployer();
        employer = employerService.create(employer);
        Assert.assertNotNull(employer.getId());
    }

    @Test
    public void testFindByEmail() {
        Employer employer = testEmployer();
        String email = "abc@lol.com";
        employer.setEmail(email);

        employer = employerService.create(employer);
        Assert.assertNotNull(employer.getId());

        Employer employer2 = employerService.findByEmail(email);
        Assert.assertEquals(employer, employer2);
    }

    @Test
    public void passwordIsEncoded() {
        Employer employer = testEmployer();
        String password = employer.getPassword();
        employer.setPassword(password);
        employer = employerService.create(employer);
        Assert.assertNotEquals(password, employer.getPassword());
    }


    private Employer testEmployer() {
        Employer employer = new Employer();
        String email = "@"+ TestUtils.randomAlphabetString(2,9,false,false)+".com";
        email = TestUtils.randomAlphabetString(64 - email.length(), false, false);
        employer.setEmail(email);
        employer.setPassword(TestUtils.randomAlphabetString(8, 20, true, true));
        employer.setFirstName(TestUtils.randomAlphabetString(20,true,true));
        employer.setLastName(TestUtils.randomAlphabetString(30, true, true));
        employer.setBirthday(new Date());
        return employer;
    }
}
