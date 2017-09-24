package fi.helsinki.cs.joosakur.asmgr.sheet;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.entity.WorkShift;
import fi.helsinki.cs.joosakur.asmgr.service.WorkShiftService;
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
import java.util.Comparator;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class HourListBuilder {

    private static final Logger logger = LoggerFactory.getLogger(HourListBuilder.class);

    private final String templateFilename = "hour-list-template.ods";
    private final DateTimeFormatter socialNumberFormatter = DateTimeFormatter.ofPattern("ddMMyy-");
    private final File templateFile;

    private final WorkShiftService workShiftService;
    private final ResourceLoader resourceLoader;

    @Autowired
    public HourListBuilder(WorkShiftService workShiftService, ResourceLoader resourceLoader) throws IOException {
        this.workShiftService = workShiftService;
        this.resourceLoader = resourceLoader;

        InputStream inputStream = resourceLoader.getResource("classpath:"+ templateFilename).getInputStream();
        templateFile = new File(templateFilename);
        FileUtils.touch(templateFile);
        FileUtils.copyInputStreamToFile(inputStream, templateFile);
    }

    public HourList build(Employer employer, Assistant assistant, LocalDate startDate, LocalDate endDate) throws IOException {
        logger.debug("Building hour list for assistant {} from date {} to date {}", assistant.getId(), startDate, endDate);
        List<WorkShift> workShifts = workShiftService.listByAssistantAndTime(assistant, startDate.minusDays(1), endDate.plusDays(1));
        HourList hourList = new HourList(getTemplateSheet());
        hourList.setEmployerName(employer.getFirstName()+" "+employer.getLastName());
        hourList.setAssistantName(assistant.getFirstName()+" "+assistant.getLastName());
        hourList.setAssistantSocialNumberStart(assistant.getBirthday().format(socialNumberFormatter));
        hourList.setHourListRows(calculateHourListRows(workShifts, startDate, endDate));
        logger.info("Hour list building successful");
        return hourList;
    }


    private Sheet getTemplateSheet() throws IOException {
        return SpreadSheet.createFromFile(templateFile).getSheet(0);
    }


    private List<HourListRow> calculateHourListRows(List<WorkShift> workShifts, LocalDate startDate, LocalDate endDate) {
        return workShifts.stream()
                    .flatMap(splitWorkShiftsIntoSpans) // split work shifts into spans contained inside some date
                    .collect( // get the time spans grouped by date+isSick
                            Collectors.groupingBy(HourListSpan::getGroup,
                                    Collectors.mapping(HourListSpan::getTimeSpan, Collectors.toList()))
                    )
                    .entrySet().stream().map(entry -> { //map the entries into instances of HourListRow
                        HourListRowGroup group = entry.getKey();
                        List<TimeSpan> timeSpans = entry.getValue();
                        return HourListRowFactory.build(group.getDate(), timeSpans, true, group.isSick());
                    })
                    .filter((row) -> !row.getDate().isBefore(startDate) && !row.getDate().isAfter(endDate))
                    .sorted(Comparator.comparing(HourListRow::getDate))
                    .collect(Collectors.toList());
    }


    private Function<WorkShift, Stream<HourListSpan>> splitWorkShiftsIntoSpans = workShift -> {
        LocalDateTime start = workShift.getStarts().truncatedTo(ChronoUnit.MINUTES);
        LocalDateTime end = workShift.getEnds().truncatedTo(ChronoUnit.MINUTES);
        logger.trace("Work shift is from {} to {}", start, end);
        boolean sick = workShift.isSick();
        List<HourListSpan> spans = new ArrayList<>();

        //while the start and end are on different days we need to split at midnight
        while (start.getDayOfYear() != end.getDayOfYear()) {
            Time spanStart = new Time(start);
            Time spanEnd = new Time(24);
            logger.trace("Not on same date, creating span on {} from {} to {}",
                    start.toLocalDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy")),
                    spanStart.toString(), spanEnd.toString());
            spans.add(new HourListSpan(start.toLocalDate(), sick, new TimeSpan(spanStart, spanEnd)));
            start = start.plusDays(1).withHour(0).withMinute(0);
        }
        Time spanStart = new Time(start);
        Time spanEnd = new Time(end);
        logger.trace("On same date, creating span on {} from {} to {}",
                start.toLocalDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy")),
                spanStart.toString(), spanEnd.toString());
        spans.add(new HourListSpan(start.toLocalDate(), sick, new TimeSpan(spanStart, spanEnd)));
        return spans.stream();
    };



    private class HourListSpan {
        private final HourListRowGroup group;
        private final TimeSpan timeSpan;

        private HourListSpan(LocalDate date, boolean sick, TimeSpan timeSpan) {
            this.group = new HourListRowGroup(date, sick);
            this.timeSpan = timeSpan;
        }


        public HourListRowGroup getGroup() {
            return group;
        }

        public LocalDate getDate() {
            return group.getDate();
        }

        public boolean isSick() {
            return group.isSick();
        }

        public TimeSpan getTimeSpan() {
            return timeSpan;
        }
    }


    private class HourListRowGroup {
        private final LocalDate date;
        private final boolean sick;

        private HourListRowGroup(LocalDate date, boolean sick) {
            this.date = date;
            this.sick = sick;
        }

        public LocalDate getDate() {
            return date;
        }

        public boolean isSick() {
            return sick;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            HourListRowGroup that = (HourListRowGroup) o;

            if (sick != that.sick) return false;
            return date.equals(that.date);
        }

        @Override
        public int hashCode() {
            int result = date.hashCode();
            result = 31 * result + (sick ? 1 : 0);
            return result;
        }
    }


}
