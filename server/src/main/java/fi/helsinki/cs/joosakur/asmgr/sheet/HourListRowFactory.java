package fi.helsinki.cs.joosakur.asmgr.sheet;

import java.time.LocalDate;
import java.util.List;

public class HourListRowFactory {
    public static HourListRow build(LocalDate date, List<TimeSpan> timeSpans, boolean wasWorking, boolean wasSick) {
        if(wasSick)
            return new SickDay(date, timeSpans);
        if(!wasWorking)
            throw new UnsupportedOperationException("not yet implemented");
        return new WorkDay(date, timeSpans);
    }
}
