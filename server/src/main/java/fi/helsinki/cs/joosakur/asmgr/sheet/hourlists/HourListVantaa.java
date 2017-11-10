package fi.helsinki.cs.joosakur.asmgr.sheet.hourlists;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.sheet.AtomicSpan;
import fi.helsinki.cs.joosakur.asmgr.sheet.DurationFormatter;
import fi.helsinki.cs.joosakur.asmgr.sheet.TimeSpan;
import fi.helsinki.cs.joosakur.asmgr.sheet.groups.DateSickNotesGroupedSpan;
import org.jopendocument.dom.spreadsheet.Sheet;

import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;


public class HourListVantaa extends HourList {

    public HourListVantaa(Sheet sheet) {
        super(sheet);
    }

    private DurationFormatter durationFormatter = new DurationFormatter();

    @Override
    public HourList populate(Assistant assistant, Stream<AtomicSpan> atomicSpans) {
        Employer employer = assistant.getEmployer();
        sheet.getCellAt(4, 3).setValue(employer.getFirstName()+" "+employer.getLastName());
        sheet.getCellAt(4, 4).setValue(assistant.getFirstName()+" "+assistant.getLastName());
        sheet.getCellAt(4, 5).setValue(assistant.getBirthday().format(DateTimeFormatter.ofPattern("ddMMyy-")));

        sheet.getCellAt(2,37).setValue(LocalDate.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy")));
        sheet.getCellAt(1, 40).setValue(assistant.getFirstName()+" "+assistant.getLastName());
        sheet.getCellAt(5, 40).setValue(employer.getFirstName()+" "+employer.getLastName());

        Duration totalHours = Duration.ZERO;
        Duration totalEveningHours = Duration.ZERO;
        Duration totalSaturdayHours = Duration.ZERO;
        Duration totalSundayHours = Duration.ZERO;
        Duration totalNightHours = Duration.ZERO;

        List<DateSickNotesGroupedSpan> groups = atomicSpans.collect(
                Collectors.groupingBy(AtomicSpan::getDateSickNotesGroup)
        ).entrySet().stream()
                .map(entry -> new DateSickNotesGroupedSpan(entry.getKey(), entry.getValue()))
                .sorted(Comparator.comparing(DateSickNotesGroupedSpan::getDate))
                .collect(Collectors.toList());

        int row = 8;
        for (DateSickNotesGroupedSpan group : groups) {
            sheet.getCellAt(1, row).setValue(group.getDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy")));
            sheet.getCellAt(2, row).setValue(getWeekdayAbbreviation(group.getDate()));

            String times = group.getTimeSpans().stream()
                    .sorted((a,b) -> {
                        if(a.getStartTime().isBefore(b.getStartTime()))
                            return -1;
                        if(a.getEndTime().isBefore(b.getEndTime()))
                            return 1;
                        return 0;
                    })
                    .map(TimeSpan::toString)
                    .collect(Collectors.joining(", "));
            sheet.getCellAt(3, row).setValue(times);

            if(group.getNotes() != null)
                sheet.getCellAt(4, row).setValue(group.getNotes());
            sheet.getCellAt(5, row).setValue(durationFormatter.apply(group.getHours()));
            sheet.getCellAt(6, row).setValue(durationFormatter.apply(group.getEveningHours()));
            sheet.getCellAt(7, row).setValue(durationFormatter.apply(group.getSaturdayHours()));
            sheet.getCellAt(8, row).setValue(durationFormatter.apply(group.getSundayHours()));
            sheet.getCellAt(9, row).setValue(durationFormatter.apply(group.getNightHours()));

            totalHours = totalHours.plus(group.getHours());
            totalEveningHours = totalEveningHours.plus(group.getEveningHours());
            totalSaturdayHours = totalSaturdayHours.plus(group.getSaturdayHours());
            totalSundayHours = totalSundayHours.plus(group.getSundayHours());
            totalNightHours = totalNightHours.plus(group.getNightHours());

            row++;
            if(row > 33)
                break;
        }


        final int SUMMARY_ROW = 35;
        sheet.getCellAt(5,SUMMARY_ROW).setValue(durationFormatter.apply(totalHours));
        sheet.getCellAt(6,SUMMARY_ROW).setValue(durationFormatter.apply(totalEveningHours));
        sheet.getCellAt(7,SUMMARY_ROW).setValue(durationFormatter.apply(totalSaturdayHours));
        sheet.getCellAt(8,SUMMARY_ROW).setValue(durationFormatter.apply(totalSundayHours));
        sheet.getCellAt(9,SUMMARY_ROW).setValue(durationFormatter.apply(totalNightHours));

        return this;
    }


}
