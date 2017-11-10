package fi.helsinki.cs.joosakur.asmgr.sheet.hourlists;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.entity.Employer;
import fi.helsinki.cs.joosakur.asmgr.sheet.AtomicSpan;
import fi.helsinki.cs.joosakur.asmgr.sheet.DurationFormatter;
import org.jopendocument.dom.spreadsheet.Sheet;

import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class HourListEspoo extends HourList {

    public HourListEspoo(Sheet sheet) {
        super(sheet);
    }

    private DurationFormatter durationFormatter = new DurationFormatter();

    @Override
    public HourList populate(Assistant assistant, Stream<AtomicSpan> atomicSpans) {
        Employer employer = assistant.getEmployer();

        sheet.getCellAt(0, 5).setValue(employer.getLastName());
        sheet.getCellAt(5, 5).setValue(employer.getFirstName());
        sheet.getCellAt(9,5).setValue(employer.getBirthday().format(DateTimeFormatter.ofPattern("ddMMyy-")));
        sheet.getCellAt(3,7).setValue(employer.getEmail());
        sheet.getCellAt(9, 7).setValue(employer.isHetaMember() ? "Kyllä" : "Ei");

        sheet.getCellAt(0,13).setValue(assistant.getLastName());
        sheet.getCellAt(5,13).setValue(assistant.getFirstName());
        sheet.getCellAt(9,13).setValue(assistant.getBirthday().format(DateTimeFormatter.ofPattern("ddMMyy-")));
        if(assistant.getEmail()!=null)
            sheet.getCellAt(3,15).setValue(assistant.getEmail());

        sheet.getCellAt(4,51).setValue(LocalDate.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy")));

        Duration totalHours = Duration.ZERO;
        Duration totalEveningHours = Duration.ZERO;
        Duration totalSaturdayHours = Duration.ZERO;
        Duration totalSundayHours = Duration.ZERO;
        Duration totalNightHours = Duration.ZERO;

        List<AtomicSpan> spanList = atomicSpans.sorted(Comparator.comparing(AtomicSpan::getDate)
                .thenComparing(span -> span.getTimeSpan().getStartTime().toLocalTime())
        ).collect(Collectors.toList());

        int row = 19;
        if(!spanList.isEmpty()) {
            int month = spanList.get(0).getDate().getMonthValue();
            for (AtomicSpan span : spanList) {
                if(month != span.getDate().getMonthValue())
                    throw new IllegalArgumentException("All dates must be on same month");

                sheet.getCellAt(0, row).setValue(span.getDate().getDayOfMonth());
                sheet.getCellAt(1, row).setValue(getWeekdayAbbreviation(span.getDate()));
                sheet.getCellAt(2,row).setValue(span.getTimeSpan().getStartTime().toString());
                sheet.getCellAt(3,row).setValue(span.getTimeSpan().getEndTime().toString());
                sheet.getCellAt(4, row).setValue(durationFormatter.apply(span.getHours()));
                sheet.getCellAt(5, row).setValue(durationFormatter.apply(span.getEveningHours()));
                sheet.getCellAt(6, row).setValue(durationFormatter.apply(span.getSaturdayHours()));
                sheet.getCellAt(7, row).setValue(durationFormatter.apply(span.getSundayHours()));
                sheet.getCellAt(8, row).setValue(durationFormatter.apply(span.getNightHours()));
                if(span.getNotes() != null)
                    sheet.getCellAt(9, row).setValue(span.getNotes());

                totalHours = totalHours.plus(span.getHours());
                totalEveningHours = totalEveningHours.plus(span.getEveningHours());
                totalSaturdayHours = totalSaturdayHours.plus(span.getSaturdayHours());
                totalSundayHours = totalSundayHours.plus(span.getSundayHours());
                totalNightHours = totalNightHours.plus(span.getNightHours());

                row++;
                if(row > 47)
                    break;

            }

            String[] monthNames = {"Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu",
                    "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"};
            sheet.getCellAt(7,1).setValue(monthNames[month-1]);
        }


        final int SUMMARY_ROW = 48;
        sheet.getCellAt(4,SUMMARY_ROW).setValue(durationFormatter.apply(totalHours));
        sheet.getCellAt(5,SUMMARY_ROW).setValue(durationFormatter.apply(totalEveningHours));
        sheet.getCellAt(6,SUMMARY_ROW).setValue(durationFormatter.apply(totalSaturdayHours));
        sheet.getCellAt(7,SUMMARY_ROW).setValue(durationFormatter.apply(totalSundayHours));
        sheet.getCellAt(8,SUMMARY_ROW).setValue(durationFormatter.apply(totalNightHours));

        return this;
    }

}
