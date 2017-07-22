package fi.helsinki.cs.joosakur.asmgr.sheet;

import java.time.LocalDate;
import java.util.List;

public class SickDay extends HourListRow{

    public SickDay(LocalDate date, List<TimeSpan> workTimes) {
        super(date, workTimes);
    }

    @Override
    protected String calculateNotes() {
        return "Sairaana";
    }
}
