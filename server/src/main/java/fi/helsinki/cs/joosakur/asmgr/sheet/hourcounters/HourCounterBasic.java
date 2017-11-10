package fi.helsinki.cs.joosakur.asmgr.sheet.hourcounters;

import fi.helsinki.cs.joosakur.asmgr.sheet.AtomicSpan;
import fi.helsinki.cs.joosakur.asmgr.sheet.Time24;
import fi.helsinki.cs.joosakur.asmgr.sheet.TimeSpan;

import java.time.DayOfWeek;

public class HourCounterBasic implements HourCounter {

    private TimeSpan eveningSpan = new TimeSpan(new Time24(18), new Time24(23));
    private TimeSpan nightSpan1 = new TimeSpan(new Time24(0), new Time24(6));
    private TimeSpan nightSpan2 = new TimeSpan(new Time24(23), new Time24(24));

    @Override
    public AtomicSpan eval(AtomicSpan atomicSpan) {
        TimeSpan timeSpan = atomicSpan.getTimeSpan();
        if(atomicSpan.isSick()) {
            atomicSpan.setNotes("Sairaana");
            return atomicSpan; //no bonuses for sick days
        }

        atomicSpan.setHours(timeSpan.getDuration());

        atomicSpan.setEveningHours(timeSpan.intersectionDuration(eveningSpan));

        atomicSpan.setNightHours(
                timeSpan.intersectionDuration(nightSpan1).plus(timeSpan.intersectionDuration(nightSpan2))
        );

        if(atomicSpan.getDate().getDayOfWeek().equals(DayOfWeek.SATURDAY))
            atomicSpan.setSaturdayHours(timeSpan.getDuration());

        if(atomicSpan.getDate().getDayOfWeek().equals(DayOfWeek.SUNDAY))
            atomicSpan.setSundayHours(timeSpan.getDuration());

        return atomicSpan;
    }
}
