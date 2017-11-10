package fi.helsinki.cs.joosakur.asmgr.sheet.groups;

import fi.helsinki.cs.joosakur.asmgr.sheet.AtomicSpan;
import fi.helsinki.cs.joosakur.asmgr.sheet.TimeSpan;

import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class DateSickNotesGroupedSpan {
    private LocalDate date;
    private boolean sick;
    private String notes;

    private List<TimeSpan> timeSpans;
    private Duration hours = Duration.ZERO;
    private Duration eveningHours = Duration.ZERO;
    private Duration saturdayHours = Duration.ZERO;
    private Duration sundayHours = Duration.ZERO;
    private Duration nightHours = Duration.ZERO;

    public DateSickNotesGroupedSpan(DateSickNotesGroup group, List<AtomicSpan> atomicSpans) {
        this.date = group.getDate();
        this.sick = group.isSick();
        this.notes = group.getNotes();
        timeSpans = new ArrayList<>(atomicSpans.size());
        for (AtomicSpan atomicSpan : atomicSpans) {
            timeSpans.add(atomicSpan.getTimeSpan());
            hours = hours.plus(atomicSpan.getHours());
            eveningHours = eveningHours.plus(atomicSpan.getEveningHours());
            saturdayHours = saturdayHours.plus(atomicSpan.getSaturdayHours());
            sundayHours = sundayHours.plus(atomicSpan.getSundayHours());
            nightHours = nightHours.plus(atomicSpan.getNightHours());
        }

    }

    public LocalDate getDate() {
        return date;
    }

    public boolean isSick() {
        return sick;
    }

    public String getNotes() {
        return notes;
    }

    public List<TimeSpan> getTimeSpans() {
        return timeSpans;
    }

    public Duration getHours() {
        return hours;
    }

    public Duration getEveningHours() {
        return eveningHours;
    }

    public Duration getSaturdayHours() {
        return saturdayHours;
    }

    public Duration getSundayHours() {
        return sundayHours;
    }

    public Duration getNightHours() {
        return nightHours;
    }
}
