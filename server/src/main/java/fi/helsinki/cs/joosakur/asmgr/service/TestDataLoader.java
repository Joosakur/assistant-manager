package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.entity.WorkShift;
import fi.helsinki.cs.joosakur.asmgr.repository.AssistantRepository;
import fi.helsinki.cs.joosakur.asmgr.repository.WorkShiftRepository;
import fi.helsinki.cs.joosakur.asmgr.sheet.HourListBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;

@Component
@Profile({"test"})
public class TestDataLoader implements CommandLineRunner {

    private final EmployerService employerService;
    private final AssistantRepository assistantRepository;
    private final WorkShiftRepository workShiftRepository;

    private final HourListBuilder hourListBuilder;

    @Autowired
    public TestDataLoader(EmployerService employerService, AssistantRepository assistantRepository, WorkShiftRepository workShiftRepository, HourListBuilder hourListBuilder) {
        this.employerService = employerService;
        this.assistantRepository = assistantRepository;
        this.workShiftRepository = workShiftRepository;
        this.hourListBuilder = hourListBuilder;
    }

    @Override
    public void run(String... strings) throws Exception {
        Employer employer = new Employer("joza.k.90@gmail.com", "oeoeoeoe", "Joosa", "Kurvinen", LocalDate.of(1990, Month.JANUARY, 7), "Helsinki", true);
        employer = employerService.create(employer, true);

        Assistant assistant = new Assistant(employer, "abc@gmail.com", "Matti", "Koivisto", LocalDate.of(1988, 3, 12));
        assistant.setBackgroundColor(Color.yellow);
        assistantRepository.save(assistant);
        Assistant assistant2 = new Assistant(employer, "def@gmail.com", "Teppo", "Mikkola", LocalDate.of(1992, 9, 21));
        assistant2.setBackgroundColor(Color.cyan);
        assistantRepository.save(assistant2);
        Assistant assistant3 = new Assistant(employer, "something.amazing@outlook.com", "Heikki", "Katajainen", LocalDate.of(1982, 2, 1));
        assistant3.setNickname("Hela");
        assistant3.setBackgroundColor(new Color(100, 20, 10));
        assistant3.setTextColor(Color.white);
        assistantRepository.save(assistant3);

        LocalDateTime from = LocalDateTime.now().withMinute(0).withSecond(0).withNano(0);
        LocalDateTime to = LocalDateTime.now().withMinute(0).withSecond(0).withNano(0);

        WorkShift workShift = new WorkShift(employer, assistant, from.withHour(9), to.withHour(17));
        workShift.setSick(true);
        workShiftRepository.save(workShift);

        WorkShift workShift2 = new WorkShift(employer, assistant2, from.withHour(17), to.withHour(23));
        workShiftRepository.save(workShift2);

        WorkShift workShift3;
        from = from.withHour(23);
        to = to.plusDays(1).withHour(9);
        for (int i = 0; i < 7; i++) {
            if(i==3){
                workShift3 = new WorkShift(employer, assistant3, from.withHour(21).withMinute(20), to);
                workShiftRepository.save(workShift3);
            }
            else if(i==5){
                workShift3 = new WorkShift(employer, assistant3, from.withHour(14), to.withHour(20).minusDays(1));
                workShift3.setSick(true);
                workShiftRepository.save(workShift3);
            }
            else {
                workShift3 = new WorkShift(employer, assistant3, from, to);
                workShiftRepository.save(workShift3);
            }

            from = from.plusDays(1);
            to = to.plusDays(1);
        }

        LocalDateTime rangeFrom = LocalDate.now().atStartOfDay();
        LocalDateTime rangeTo = LocalDate.now().plusDays(10).atTime(LocalTime.MAX);
        //hourListBuilder.build(employer, assistant3, rangeFrom.toLocalDate(), rangeTo.toLocalDate()).saveAs("/asmgr/test.ods");
    }
}
