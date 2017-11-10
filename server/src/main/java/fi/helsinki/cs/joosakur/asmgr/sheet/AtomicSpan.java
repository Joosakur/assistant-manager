package fi.helsinki.cs.joosakur.asmgr.sheet;

import fi.helsinki.cs.joosakur.asmgr.sheet.groups.DateSickNotesGroup;

import java.time.Duration;
import java.time.LocalDate;

public class AtomicSpan {
    private LocalDate date;
    private TimeSpan timeSpan;
    private boolean sick;
    private Duration hours = Duration.ZERO;
    private Duration eveningHours = Duration.ZERO;
    private Duration saturdayHours = Duration.ZERO;
    private Duration sundayHours = Duration.ZERO;
    private Duration nightHours = Duration.ZERO;
    private String notes;

    public AtomicSpan(LocalDate date, TimeSpan timeSpan, boolean sick) {
        this.date = date;
        this.timeSpan = timeSpan;
        this.sick = sick;
    }

    public AtomicSpan(LocalDate date, Time24 start, Time24 end, boolean sick) {
        this.date = date;
        this.timeSpan = new TimeSpan(start, end);
        this.sick = sick;
    }

    public LocalDate getDate() {
        return date;
    }

    public TimeSpan getTimeSpan() {
        return timeSpan;
    }

    public boolean isSick() {
        return sick;
    }

    public Duration getHours() {
        return hours;
    }

    public void setHours(Duration hours) {
        this.hours = hours;
    }

    public Duration getEveningHours() {
        return eveningHours;
    }

    public void setEveningHours(Duration eveningHours) {
        this.eveningHours = eveningHours;
    }

    public Duration getSaturdayHours() {
        return saturdayHours;
    }

    public void setSaturdayHours(Duration saturdayHours) {
        this.saturdayHours = saturdayHours;
    }

    public Duration getSundayHours() {
        return sundayHours;
    }

    public void setSundayHours(Duration sundayHours) {
        this.sundayHours = sundayHours;
    }

    public Duration getNightHours() {
        return nightHours;
    }

    public void setNightHours(Duration nightHours) {
        this.nightHours = nightHours;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public DateSickNotesGroup getDateSickNotesGroup() {
        return new DateSickNotesGroup(date, sick, notes);
    }

}
