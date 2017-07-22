package fi.helsinki.cs.joosakur.asmgr.service;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.entity.WorkShift;
import fi.helsinki.cs.joosakur.asmgr.repository.AssistantRepository;
import fi.helsinki.cs.joosakur.asmgr.repository.WorkShiftRepository;
import fi.helsinki.cs.joosakur.asmgr.sheet.HourListBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.util.Date;

@Component
public class DevDataLoader implements CommandLineRunner {

    private final EmployerService employerService;
    private final AssistantRepository assistantRepository;
    private final WorkShiftRepository workShiftRepository;

    private final HourListBuilder hourListBuilder;

    @Autowired
    public DevDataLoader(EmployerService employerService, AssistantRepository assistantRepository, WorkShiftRepository workShiftRepository, HourListBuilder hourListBuilder) {
        this.employerService = employerService;
        this.assistantRepository = assistantRepository;
        this.workShiftRepository = workShiftRepository;
        this.hourListBuilder = hourListBuilder;
    }

    @Override
    public void run(String... strings) throws Exception {
        Employer employer = new Employer("joza.k.90@gmail.com", "oeoeoeoe", "Joosa", "Kurvinen", new Date());
        employer = employerService.create(employer);

        Assistant assistant = new Assistant(employer, "abc@gmail.com", "Matti", "Koivisto", new Date());
        assistant.setBackgroundColor(Color.yellow);
        assistantRepository.save(assistant);
        Assistant assistant2 = new Assistant(employer, "def@gmail.com", "Teppo", "Mikkola", new Date());
        assistant2.setBackgroundColor(Color.cyan);
        assistantRepository.save(assistant2);
        Assistant assistant3 = new Assistant(employer, "something.amazing@outlook.com", "Heikki", "Katajainen", new Date());
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
            workShift3 = new WorkShift(employer, assistant3, from, to);
            workShiftRepository.save(workShift3);
            from = from.plusDays(1);
            to = to.plusDays(1);
        }

        LocalDateTime rangeFrom = LocalDate.of(2017, Month.JULY, 20).atStartOfDay();//LocalDate.now().atStartOfDay()
        LocalDateTime rangeTo = LocalDate.of(2017, Month.JULY, 24).atTime(LocalTime.MAX); //LocalDate.now().plusDays(10).atTime(LocalTime.MAX)
        hourListBuilder.build(employer, assistant3, rangeFrom.toLocalDate(), rangeTo.toLocalDate()).saveAs("/asmgr/test.ods");
        LocalDateTime rangeFrom2 = LocalDate.of(2017, Month.JULY, 25).atStartOfDay();
        LocalDateTime rangeTo2 = LocalDate.of(2017, Month.JULY, 30).atTime(LocalTime.MAX);
        hourListBuilder.build(employer, assistant3, rangeFrom2.toLocalDate(), rangeTo2.toLocalDate()).saveAs("/asmgr/test2.ods");

    }
}