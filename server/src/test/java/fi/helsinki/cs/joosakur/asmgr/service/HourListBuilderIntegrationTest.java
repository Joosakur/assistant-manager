package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.entity.WorkShift;
import fi.helsinki.cs.joosakur.asmgr.exception.NotUniqueException;
import fi.helsinki.cs.joosakur.asmgr.sheet.hourlists.HourList;
import fi.helsinki.cs.joosakur.asmgr.sheet.HourListBuilderService;
import org.jopendocument.dom.spreadsheet.Sheet;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@Transactional
@ActiveProfiles("test")
public class HourListBuilderIntegrationTest {

    @Autowired
    private EmployerService employerService;

    @Autowired
    private AssistantService assistantService;

    @Autowired
    private WorkShiftService workShiftService;

    @Autowired
    private HourListBuilderService hourListBuilder;

    private Employer createEmployer(String city, boolean hetaMember) throws NotUniqueException {
        Employer employer = new Employer("test@test.com", "qwertyui", "test", "tester",
                LocalDate.of(1990, 2, 20), city, hetaMember);
        return employerService.create(employer, true);
    }

    private Assistant createAssistant(Employer employer) {
        return assistantService.create(new Assistant(employer, "assistant@test.com",
                "assistant", "helper",
                LocalDate.of(1980, 3, 21)));
    }

    private void createTestShifts(Employer employer, Assistant assistant) {
        workShiftService.create(new WorkShift(employer, assistant,
                LocalDateTime.of(2017, 4, 10, 9, 0),
                LocalDateTime.of(2017, 4, 10, 17, 0)));
        workShiftService.create(new WorkShift(employer, assistant,
                LocalDateTime.of(2017, 4, 11, 15, 20),
                LocalDateTime.of(2017, 4, 11, 21, 45)));
        workShiftService.create(new WorkShift(employer, assistant,
                LocalDateTime.of(2017, 4, 12, 17, 0),
                LocalDateTime.of(2017, 4, 12, 23, 0)));

        workShiftService.create(new WorkShift(employer, assistant,
                LocalDateTime.of(2017, 4, 16, 13, 0),
                LocalDateTime.of(2017, 4, 16, 21, 0)));
        workShiftService.create(new WorkShift(employer, assistant,
                LocalDateTime.of(2017, 4, 17, 13, 0),
                LocalDateTime.of(2017, 4, 17, 21, 0)));

        workShiftService.create(new WorkShift(employer, assistant,
                LocalDateTime.of(2017, 4, 19, 23, 0),
                LocalDateTime.of(2017, 4, 20, 9, 0)));
        workShiftService.create(new WorkShift(employer, assistant,
                LocalDateTime.of(2017, 4, 20, 23, 0),
                LocalDateTime.of(2017, 4, 21, 9, 0)));
    }

    @Test
    public void testHelsinkiHetaEmployer() throws Exception {
        Employer employer = createEmployer("Helsinki", true);
        Assistant assistant = createAssistant(employer);
        createTestShifts(employer, assistant);

        HourList hourList = hourListBuilder.build(assistant, LocalDate.of(2017, 4, 1), LocalDate.of(2017, 4, 30));
        hourList.saveAsAndOpen("test-output/helsinki-heta-" + System.currentTimeMillis() + ".ods");

        Sheet sheet = hourList.getSheet();
        Assert.assertEquals("10.04.2017", sheet.getCellAt(1, 8).getValue());
        Assert.assertEquals("ma", sheet.getCellAt(2, 8).getValue());
        Assert.assertEquals("09-17", sheet.getCellAt(3, 8).getValue());
        Assert.assertEquals("", sheet.getCellAt(4, 8).getValue());
        Assert.assertEquals("8", sheet.getCellAt(5, 8).getValue().toString());
        Assert.assertEquals("", sheet.getCellAt(6, 8).getValue());
        Assert.assertEquals("", sheet.getCellAt(7, 8).getValue());
        Assert.assertEquals("", sheet.getCellAt(8, 8).getValue());
        Assert.assertEquals("", sheet.getCellAt(9, 8).getValue());

        Assert.assertEquals("11.04.2017", sheet.getCellAt(1, 9).getValue());
        Assert.assertEquals("ti", sheet.getCellAt(2, 9).getValue());
        Assert.assertEquals("15:20-21:45", sheet.getCellAt(3, 9).getValue());
        Assert.assertEquals("", sheet.getCellAt(4, 9).getValue());
        Assert.assertEquals("6:25", sheet.getCellAt(5, 9).getValue());
        Assert.assertEquals("3:45", sheet.getCellAt(6, 9).getValue());
        Assert.assertEquals("", sheet.getCellAt(7, 9).getValue());
        Assert.assertEquals("", sheet.getCellAt(8, 9).getValue());
        Assert.assertEquals("", sheet.getCellAt(9, 9).getValue());

        Assert.assertEquals("12.04.2017", sheet.getCellAt(1, 10).getValue());
        Assert.assertEquals("ke", sheet.getCellAt(2, 10).getValue());
        Assert.assertEquals("17-23", sheet.getCellAt(3, 10).getValue());
        Assert.assertEquals("", sheet.getCellAt(4, 10).getValue());
        Assert.assertEquals("6", sheet.getCellAt(5, 10).getValue().toString());
        Assert.assertEquals("5", sheet.getCellAt(6, 10).getValue().toString());
        Assert.assertEquals("", sheet.getCellAt(7, 10).getValue());
        Assert.assertEquals("", sheet.getCellAt(8, 10).getValue());
        Assert.assertEquals("", sheet.getCellAt(9, 10).getValue());

        Assert.assertEquals("16.04.2017", sheet.getCellAt(1, 11).getValue());
        Assert.assertEquals("su", sheet.getCellAt(2, 11).getValue());
        Assert.assertEquals("13-21", sheet.getCellAt(3, 11).getValue());
        Assert.assertEquals("", sheet.getCellAt(4, 11).getValue());
        Assert.assertEquals("8", sheet.getCellAt(5, 11).getValue().toString());
        Assert.assertEquals("3", sheet.getCellAt(6, 11).getValue().toString());
        Assert.assertEquals("", sheet.getCellAt(7, 11).getValue());
        Assert.assertEquals("8", sheet.getCellAt(8, 11).getValue().toString());
        Assert.assertEquals("", sheet.getCellAt(9, 11).getValue());

        Assert.assertEquals("17.04.2017", sheet.getCellAt(1, 12).getValue());
        Assert.assertEquals("ma", sheet.getCellAt(2, 12).getValue());
        Assert.assertEquals("13-21", sheet.getCellAt(3, 12).getValue());
        Assert.assertEquals("", sheet.getCellAt(4, 12).getValue());
        Assert.assertEquals("8", sheet.getCellAt(5, 12).getValue().toString());
        Assert.assertEquals("3", sheet.getCellAt(6, 12).getValue().toString());
        Assert.assertEquals("", sheet.getCellAt(7, 12).getValue());
        Assert.assertEquals("", sheet.getCellAt(8, 12).getValue());
        Assert.assertEquals("", sheet.getCellAt(9, 12).getValue());

        Assert.assertEquals("19.04.2017", sheet.getCellAt(1, 13).getValue());
        Assert.assertEquals("ke", sheet.getCellAt(2, 13).getValue());
        Assert.assertEquals("23-24", sheet.getCellAt(3, 13).getValue());
        Assert.assertEquals("", sheet.getCellAt(4, 13).getValue());
        Assert.assertEquals("1", sheet.getCellAt(5, 13).getValue().toString());
        Assert.assertEquals("", sheet.getCellAt(6, 13).getValue());
        Assert.assertEquals("", sheet.getCellAt(7, 13).getValue());
        Assert.assertEquals("", sheet.getCellAt(8, 13).getValue());
        Assert.assertEquals("1", sheet.getCellAt(9, 13).getValue().toString());

        Assert.assertEquals("20.04.2017", sheet.getCellAt(1, 14).getValue());
        Assert.assertEquals("to", sheet.getCellAt(2, 14).getValue());
        Assert.assertEquals("00-09, 23-24", sheet.getCellAt(3, 14).getValue());
        Assert.assertEquals("", sheet.getCellAt(4, 14).getValue());
        Assert.assertEquals("10", sheet.getCellAt(5, 14).getValue().toString());
        Assert.assertEquals("", sheet.getCellAt(6, 14).getValue());
        Assert.assertEquals("", sheet.getCellAt(7, 14).getValue());
        Assert.assertEquals("", sheet.getCellAt(8, 14).getValue());
        Assert.assertEquals("7", sheet.getCellAt(9, 14).getValue().toString());

        Assert.assertEquals("21.04.2017", sheet.getCellAt(1, 15).getValue());
        Assert.assertEquals("pe", sheet.getCellAt(2, 15).getValue());
        Assert.assertEquals("00-09", sheet.getCellAt(3, 15).getValue());
        Assert.assertEquals("", sheet.getCellAt(4, 15).getValue());
        Assert.assertEquals("9", sheet.getCellAt(5, 15).getValue().toString());
        Assert.assertEquals("", sheet.getCellAt(6, 15).getValue());
        Assert.assertEquals("", sheet.getCellAt(7, 15).getValue());
        Assert.assertEquals("", sheet.getCellAt(8, 15).getValue());
        Assert.assertEquals("6", sheet.getCellAt(9, 15).getValue().toString());

        Assert.assertEquals("", sheet.getCellAt(1, 36).getValue());
        Assert.assertEquals("8", sheet.getCellAt(2, 36).getValue().toString());
        Assert.assertEquals("", sheet.getCellAt(3, 36).getValue());
        Assert.assertEquals("", sheet.getCellAt(4, 36).getValue());
        Assert.assertEquals("56:25", sheet.getCellAt(5, 36).getValue());
        Assert.assertEquals("14:45", sheet.getCellAt(6, 36).getValue());
        Assert.assertEquals("", sheet.getCellAt(7, 36).getValue());
        Assert.assertEquals("8", sheet.getCellAt(8, 36).getValue().toString());
        Assert.assertEquals("14", sheet.getCellAt(9, 36).getValue().toString());
    }


    @Test
    public void testEspooHetaEmployer() throws Exception {
        Employer employer = createEmployer("Espoo", true);
        Assistant assistant = createAssistant(employer);
        createTestShifts(employer, assistant);

        HourList hourList = hourListBuilder.build(assistant, LocalDate.of(2017, 4, 1), LocalDate.of(2017, 4, 30));
        hourList.saveAsAndOpen("test-output/espoo-heta-" + System.currentTimeMillis() + ".ods");
    }


    @Test
    public void testOtherNonHetaEmployer() throws Exception {
        Employer employer = createEmployer("Muu Suomi", false);
        Assistant assistant = createAssistant(employer);
        createTestShifts(employer, assistant);

        HourList hourList = hourListBuilder.build(assistant, LocalDate.of(2017, 4, 1), LocalDate.of(2017, 4, 30));
        hourList.saveAsAndOpen("test-output/muu-suomi-non-heta-" + System.currentTimeMillis() + ".ods");
    }



}
