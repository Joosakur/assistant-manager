package fi.helsinki.cs.joosakur.asmgr.sheet;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.util.List;

public class WorkDay extends HourListRow{

    public WorkDay(LocalDate date, List<TimeSpan> workTimes) {
        super(date, workTimes);
    }

    @Override
    protected boolean isSick() {
        return false;
    }

    @Override
    protected boolean isWorking() {
        return true;
    }

    @Override
    public Duration getEveningDuration() {
        TimeSpan eveningTime = new TimeSpan(new Time(18,0), new Time(23,0));
        return getWorkTimes().stream()
                .map(timeSpan -> timeSpan.intersectionDuration(eveningTime))
                .reduce(Duration.ZERO, Duration::plus);
    }

    @Override
    public Duration getSaturdayDuration() {
        if(getDate().getDayOfWeek() == DayOfWeek.SATURDAY && !isAtLeastDoubleWage()) {
            return getNormalDuration();
        }
        return Duration.ZERO;
    }

    @Override
    public Duration getSundayDuration() {
        if(isTripleWage())
            return getNormalDuration().multipliedBy(2);
        else if(isAtLeastDoubleWage())
            return getNormalDuration();
        else
            return Duration.ZERO;
    }

    @Override
    public String getNotes() {
        return ""; //todo: special holiday notes
    }

    @Override
    public Duration getNightDuration() {
        TimeSpan nightTime1 = new TimeSpan(new Time(0), new Time(6));
        TimeSpan nightTime2 = new TimeSpan(new Time(23), new Time(24));

        Duration nightDuration = Duration.ZERO;
        for (TimeSpan workTime : getWorkTimes()) {
            nightDuration = nightDuration.plus(workTime.intersectionDuration(nightTime1));
            nightDuration = nightDuration.plus(workTime.intersectionDuration(nightTime2));
        }

        return nightDuration;
    }

    private boolean isAtLeastDoubleWage() {
        return getDate().getDayOfWeek() == DayOfWeek.SUNDAY; //todo: other holidays
    }

    private boolean isTripleWage() {
        return false; //todo: working during a special business day holiday
    }


}
