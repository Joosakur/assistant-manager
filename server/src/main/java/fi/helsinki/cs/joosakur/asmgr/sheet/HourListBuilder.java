package fi.helsinki.cs.joosakur.asmgr.sheet;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.entity.WorkShift;
import fi.helsinki.cs.joosakur.asmgr.service.WorkShiftService;
import org.jopendocument.dom.spreadsheet.Sheet;
import org.jopendocument.dom.spreadsheet.SpreadSheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
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

    private final String templateFilePath = "hour-list-template.ods";
    private final DateTimeFormatter socialNumberFormatter = DateTimeFormatter.ofPattern("ddMMyy-");

    private final WorkShiftService workShiftService;

    @Autowired
    public HourListBuilder(WorkShiftService workShiftService) {
        this.workShiftService = workShiftService;
    }

    public HourList build(Employer employer, Assistant assistant, LocalDate startDate, LocalDate endDate) throws IOException {
        List<WorkShift> workShifts = workShiftService.listByAssistantAndTime(assistant, startDate, endDate);
        HourList hourList = new HourList(getTemplateSheet());
        hourList.setEmployerName(employer.getFirstName()+" "+employer.getLastName());
        hourList.setAssistantName(assistant.getFirstName()+" "+assistant.getLastName());
        hourList.setAssistantSocialNumberStart(assistant.getBirthday().format(socialNumberFormatter));
        hourList.setHourListRows(calculateHourListRows(workShifts));
        return hourList;
    }


    private File getFileFromResources(String fileName) throws IOException {
        //Get file from resources folder
        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(classLoader.getResource(fileName).getFile());
        if(!file.exists())
            throw new IOException("File missing: "+fileName);
        return file;
    }

    private Sheet getTemplateSheet() throws IOException {
        return SpreadSheet.createFromFile(getFileFromResources(templateFilePath)).getSheet(0);
    }


    private List<HourListRow> calculateHourListRows(List<WorkShift> workShifts) {
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
                    .sorted(Comparator.comparing(HourListRow::getDate))
                    .collect(Collectors.toList());
    }


    private Function<WorkShift, Stream<HourListSpan>> splitWorkShiftsIntoSpans = workShift -> {
        LocalDateTime start = workShift.getStarts().truncatedTo(ChronoUnit.MINUTES);
        LocalDateTime end = workShift.getEnds().truncatedTo(ChronoUnit.MINUTES);
        boolean sick = workShift.isSick();
        List<HourListSpan> spans = new ArrayList<>();

        //while the start and end are on different days we need to split at midnight
        while (!start.toLocalDate().equals(end.toLocalDate())) {
            Time spanStart = new Time(start);
            Time spanEnd = new Time(24);
            spans.add(new HourListSpan(start.toLocalDate(), sick, new TimeSpan(spanStart, spanEnd)));
            start = start.plusDays(1).withHour(0).withMinute(0);
        }
        Time spanStart = new Time(start);
        Time spanEnd = new Time(end);
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
