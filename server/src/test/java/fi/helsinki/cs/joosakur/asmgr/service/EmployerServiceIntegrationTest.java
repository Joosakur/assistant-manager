package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.test.TestUtils;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.Date;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@Transactional
public class EmployerServiceIntegrationTest {

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
