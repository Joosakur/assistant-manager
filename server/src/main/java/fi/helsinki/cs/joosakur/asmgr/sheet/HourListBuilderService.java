package fi.helsinki.cs.joosakur.asmgr.sheet;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.entity.WorkShift;
import fi.helsinki.cs.joosakur.asmgr.service.WorkShiftService;
import fi.helsinki.cs.joosakur.asmgr.sheet.hourcounters.HourCounter;
import fi.helsinki.cs.joosakur.asmgr.sheet.hourcounters.HourCounterBasic;
import fi.helsinki.cs.joosakur.asmgr.sheet.hourcounters.HourCounterHeta;
import fi.helsinki.cs.joosakur.asmgr.sheet.hourlists.*;
import org.apache.commons.io.FileUtils;
import org.jopendocument.dom.spreadsheet.Sheet;
import org.jopendocument.dom.spreadsheet.SpreadSheet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Stream;

@Service
public class HourListBuilderService {

    @Autowired
    private WorkShiftService workShiftService;

    @Autowired
    private ResourceLoader resourceLoader;

    private static final Logger logger = LoggerFactory.getLogger(HourListBuilderService.class);

    public HourList build(Assistant assistant, LocalDate from, LocalDate to) throws IOException {
        List<WorkShift> workShifts = workShiftService.listByAssistantAndTime(assistant, from.minusDays(1), to.plusDays(1));

        HourCounter hourCounter;
        Employer employer = assistant.getEmployer();
        if(employer.isHetaMember())
            hourCounter = new HourCounterHeta();
        else {
            hourCounter = new HourCounterBasic();
        }

        Stream<AtomicSpan> atomicSpans = workShifts.stream()
                .flatMap(splitWorkShiftsIntoSpans)
                .filter(span -> !from.isAfter(span.getDate()) && !to.isBefore(span.getDate()))
                .map(hourCounter::eval);

        HourList hourList;
        switch (employer.getCity()) {
            case "Helsinki":
                hourList = new HourListHelsinki(getTemplateSheet("sheets/helsinki.ods"));
                break;
            case "Espoo":
                hourList = new HourListEspoo(getTemplateSheet("sheets/espoo.ods"));
                break;
            case "Vantaa":
                hourList = new HourListVantaa(getTemplateSheet("sheets/vantaa.ods"));
                break;
            default:
                hourList = new HourListGeneric(getTemplateSheet("sheets/generic.ods"));
        }
        return hourList.populate(assistant, atomicSpans);
    }

    private Sheet getTemplateSheet(String templateFilename) throws IOException {
        InputStream inputStream = resourceLoader.getResource("classpath:"+ templateFilename).getInputStream();
        File templateFile = new File(templateFilename);
        FileUtils.touch(templateFile);
        FileUtils.copyInputStreamToFile(inputStream, templateFile);
        return SpreadSheet.createFromFile(templateFile).getSheet(0);
    }

    private Function<WorkShift, Stream<AtomicSpan>> splitWorkShiftsIntoSpans = workShift -> {
        LocalDateTime start = workShift.getStarts().truncatedTo(ChronoUnit.MINUTES);
        LocalDateTime end = workShift.getEnds().truncatedTo(ChronoUnit.MINUTES);
        logger.trace("Work shift is from {} to {}", start, end);
        boolean sick = workShift.isSick();
        List<AtomicSpan> spans = new ArrayList<>();

        //while the start and end are on different days we need to split at midnight
        while (start.getDayOfYear() != end.getDayOfYear()) {
            Time24 spanStart = new Time24(start);
            Time24 spanEnd = new Time24(24);
            logger.trace("Not on same date, creating span on {} from {} to {}", start.toLocalDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy")), spanStart.toString(), spanEnd.toString());
            spans.add(new AtomicSpan(start.toLocalDate(), new TimeSpan(spanStart, spanEnd), sick));
            start = start.plusDays(1).withHour(0).withMinute(0);
        }
        Time24 spanStart = new Time24(start);
        Time24 spanEnd = new Time24(end);
        logger.trace("On same date, creating span on {} from {} to {}", start.toLocalDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy")), spanStart.toString(), spanEnd.toString());
        spans.add(new AtomicSpan(start.toLocalDate(), new TimeSpan(spanStart, spanEnd), sick));
        return spans.stream();
    };

}
