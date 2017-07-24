package fi.helsinki.cs.joosakur.asmgr.sheet;

import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * This class will be used instead of java.time.LocalTime. The main difference is that this class supports time 24:00.
 */
public class Time implements Comparable<Time>, Cloneable {
    private final int hours;
    private final int minutes;

    public Time(int hours, int minutes) {
        if(hours<0 || hours>24 || minutes < 0 || minutes>59 || (hours==24 && minutes>0))
            throw new IllegalArgumentException("Illegal time: "+hours+":"+minutes);

        this.hours = hours;
        this.minutes = minutes;
    }

    public Time(int hours) {
        this(hours, 0);
    }

    public Time(LocalTime localTime) {
        this(localTime.getHour(), localTime.getMinute());
    }

    public Time(LocalDateTime localDateTime) {
        this(localDateTime.toLocalTime());
    }



    public boolean isBefore(Time time) {
        return hours < time.hours || (hours == time.hours && minutes < time.minutes);
    }

    public boolean isAfter(Time time) {
        return hours > time.hours || (hours == time.hours && minutes > time.minutes);
    }

    public LocalTime toLocalTime() {
        if(hours == 24)
            return LocalTime.MIDNIGHT;
        return LocalTime.of(hours, minutes);
    }

    @Override
    public Time clone() {
        return new Time(this.hours, this.minutes);
    }

    public int getHour() {
        return hours;
    }

    public int getMinute() {
        return minutes;
    }

    @Override
    public String toString() {
        String string = (hours < 10 ? "0" : "") + hours;
        if(minutes > 0)
            string += ":" + (minutes < 10 ? "0" : "") + minutes;
        return string;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Time time = (Time) o;

        if (hours != time.hours) return false;
        return minutes == time.minutes;
    }

    @Override
    public int compareTo(Time o) {
        if(this.isBefore(o))
            return -1;
        if(this.isAfter(o))
            return 1;
        return 0;
    }
}
