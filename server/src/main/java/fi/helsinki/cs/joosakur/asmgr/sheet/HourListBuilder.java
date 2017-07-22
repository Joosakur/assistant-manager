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
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class HourListBuilder {

    private final String templateFilePath = "hour-list-template.ods";
    private final SimpleDateFormat socialFormat = new SimpleDateFormat("ddMMyy-");

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
        hourList.setAssistantSocialNumberStart(socialFormat.format(assistant.getBirthday()));

        Map<RowGroup, List<TimeSpan>> workMap = new HashMap<>(2*workShifts.size());
        for (WorkShift workShift : workShifts) {
            if(workShift.getEnds().isBefore(workShift.getStarts()))
                throw new IllegalArgumentException("Can't have work shift going backwards.. id="+workShift.getId());
            if(Duration.ofDays(20).minus(Duration.between(workShift.getStarts(), workShift.getEnds())).isNegative())
                throw new IllegalArgumentException("Too long work shift.. id="+workShift.getId());

            addSpans(workShift.getStarts(), workShift.getEnds(), workMap, workShift.isSick());
        }

        List<HourListRow> rows = new ArrayList<>();
        for (RowGroup group : workMap.keySet()) {
            List<TimeSpan> workTimes = workMap.get(group);
            workTimes.sort(Comparator.comparing(TimeSpan::getStartTime));
            if(group.sick) {
                rows.add(new SickDay(group.date, workTimes));
            }
            else
                rows.add(new WorkDay(group.date, workTimes));
        }
        rows.sort(Comparator.comparing(HourListRow::getDate));
        rows = rows.stream()
                .filter(row -> !row.getDate().isBefore(startDate) && !row.getDate().isAfter(endDate))
                .collect(Collectors.toList());

        hourList.setHourListRows(rows);
        return hourList;
    }

    private void addSpans(LocalDateTime start, LocalDateTime end, Map<RowGroup, List<TimeSpan>> workMap, boolean sick) {
        RowGroup group = new RowGroup(start.toLocalDate(), sick);
        List<TimeSpan> spans = workMap.get(group);
        if(spans == null)
            spans = new ArrayList<>();
        if(start.toLocalDate().equals(end.toLocalDate())) {
            spans.add(new TimeSpan(new Time(start.toLocalTime()), new Time(end.toLocalTime())));
            workMap.put(group, spans);
        }
        else {
            spans.add(new TimeSpan(new Time(start.toLocalTime()), new Time(24,0)));
            workMap.put(group, spans);
            LocalDateTime nextStart = start.plusDays(1).withHour(0).withMinute(0).withSecond(0);
            addSpans(nextStart, end, workMap, sick);
        }
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


    private class RowGroup {
        LocalDate date;
        private boolean sick;

        public RowGroup(LocalDate date, boolean sick) {
            this.date = date;
            this.sick = sick;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            RowGroup group = (RowGroup) o;

            if (sick != group.sick) return false;
            return date.equals(group.date);
        }

        @Override
        public int hashCode() {
            int result = date.hashCode();
            result = 31 * result + (sick ? 1 : 0);
            return result;
        }
    }


}
