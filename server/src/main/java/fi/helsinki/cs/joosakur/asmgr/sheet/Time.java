package fi.helsinki.cs.joosakur.asmgr.sheet;

import java.time.LocalTime;

public class Time implements Comparable<Time>{
    private int hours;
    private int minutes;

    public Time(int hours, int minutes) {
        if(hours<0 || hours>24 || minutes < 0 || minutes>59 || (hours==24 && minutes>0))
            throw new IllegalArgumentException("Illegal time: "+hours+":"+minutes);

        this.hours = hours;
        this.minutes = minutes;
    }

    public Time(int hours) {
        this(hours, 0);
    }

    public Time(LocalTime time) {
        this.hours = time.getHour();
        this.minutes = time.getMinute();
    }

    public boolean before(Time time) {
        return hours < time.hours || (hours == time.hours && minutes < time.minutes);
    }

    public boolean after(Time time) {
        return hours > time.hours || (hours == time.hours && minutes > time.minutes);
    }

    public Time getCopy() {
        return new Time(this.hours, this.minutes);
    }

    public int getHours() {
        return hours;
    }

    public int getMinutes() {
        return minutes;
    }

    public int getTotalInMinutes() {
        return 60 * hours + minutes;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public void setMinutes(int minutes) {
        this.minutes = minutes;
    }

    @Override
    public String toString() {
        String string = (hours < 10 ? "0" : "") + hours;
        if(minutes > 0)
            string += ":" + (minutes < 10 ? "0" : "") + minutes;
        return string;
    }

    @Override
    public int compareTo(Time o) {
        if(this.before(o))
            return -1;
        if(this.after(o))
            return 1;
        return 0;
    }
}
