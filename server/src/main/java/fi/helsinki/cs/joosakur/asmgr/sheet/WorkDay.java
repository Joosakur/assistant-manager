package fi.helsinki.cs.joosakur.asmgr.sheet;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

public class WorkDay extends HourListRow{

    public WorkDay(LocalDate date, List<TimeSpan> workTimes) {
        super(date, workTimes);
    }

    @Override
    protected TimeDuration calculateEveningDuration() {
        TimeSpan eveningTime = new TimeSpan(new Time(18), new Time(23));
        TimeDuration eveningDuration = new TimeDuration();
        for (TimeSpan workTime : getWorkTimes()) {
            eveningDuration.add(workTime.intersection(eveningTime).getDuration());
        }
        return eveningDuration;
    }

    private boolean isDoubleWage() {
        return getDate().getDayOfWeek() == DayOfWeek.SUNDAY; //todo: other holidays
    }

    private boolean isTripleWage() {
        return false; //todo: other holidays
    }

    @Override
    protected TimeDuration calculateSundayDuration() {
        TimeDuration sunday = new TimeDuration();

        if(isTripleWage()) {
            for (TimeSpan timeSpan : getWorkTimes()) {
                sunday.add(timeSpan.getDuration()).add(timeSpan.getDuration());
            }
        }
        else if(isDoubleWage()) {
            for (TimeSpan timeSpan : getWorkTimes()) {
                sunday.add(timeSpan.getDuration());
            }
        }

        return sunday;
    }

    @Override
    protected TimeDuration calculateSaturdayDuration() {
        TimeDuration saturday = new TimeDuration();

        if(getDate().getDayOfWeek() == DayOfWeek.SATURDAY && getSundayDuration().isZero()) {
            for (TimeSpan timeSpan : getWorkTimes()) {
                saturday.add(timeSpan.getDuration());
            }
        }
        return saturday;
    }

    @Override
    protected String calculateNotes() {
        return ""; //todo: special holiday notes
    }

    @Override
    protected TimeDuration calculateNightDuration() {
        TimeSpan nightTime1 = new TimeSpan(new Time(0), new Time(6));
        TimeSpan nightTime2 = new TimeSpan(new Time(23), new Time(24));

        TimeDuration nightDuration = new TimeDuration();
        for (TimeSpan workTime : getWorkTimes()) {
            nightDuration.add(workTime.intersection(nightTime1).getDuration());
            nightDuration.add(workTime.intersection(nightTime2).getDuration());
        }
        return nightDuration;
    }

}
