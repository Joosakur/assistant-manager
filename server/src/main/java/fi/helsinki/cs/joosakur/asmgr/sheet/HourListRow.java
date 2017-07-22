package fi.helsinki.cs.joosakur.asmgr.sheet;

import org.apache.commons.lang3.StringUtils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

public abstract class HourListRow {

    private LocalDate date;
    private List<TimeSpan> workTimes;
    private String notes = "";
    private TimeDuration normalDuration;
    private TimeDuration eveningDuration;
    private TimeDuration saturdayDuration;
    private TimeDuration sundayDuration;
    private TimeDuration nightDuration;

    public HourListRow(LocalDate date, List<TimeSpan> workTimes) {
        this.date = date;
        this.workTimes = workTimes;

        normalDuration = calculateNormalDuration();
        eveningDuration = calculateEveningDuration();
        nightDuration = calculateNightDuration();
        sundayDuration = calculateSundayDuration();
        saturdayDuration = calculateSaturdayDuration();
        notes = calculateNotes();
    }

    private String calculateWeekdayString() {
        switch (date.getDayOfWeek()) {
            case MONDAY:
                return "ma";
            case TUESDAY:
                return "ti";
            case WEDNESDAY:
                return "ke";
            case THURSDAY:
                return "to";
            case FRIDAY:
                return "pe";
            case SATURDAY:
                return "la";
            case SUNDAY:
                return "su";
            default:
                return "";
        }
    }


    private TimeDuration calculateNormalDuration() {
        normalDuration = new TimeDuration();
        for (TimeSpan workTime : getWorkTimes()) {
            normalDuration.add(workTime.getDuration());
        }
        return normalDuration;
    }

    protected TimeDuration calculateEveningDuration() {
        return new TimeDuration();
    }

    protected TimeDuration calculateSundayDuration() {
        return new TimeDuration();
    }

    protected TimeDuration calculateSaturdayDuration() {
        return new TimeDuration();
    }

    protected String calculateNotes() {
        return "";
    }

    protected TimeDuration calculateNightDuration() {
        return new TimeDuration();
    }

    public String[] toStrings() {
        String [] arr = new String[9];

        arr [0] = DateTimeFormatter.ofPattern("dd.MM.yyyy").format(date);
        arr [1] = calculateWeekdayString();

        String [] times = new String[getWorkTimes().size()];
        for (int i = 0; i < getWorkTimes().size(); i++) {
            times [i] = getWorkTimes().get(i).toString();
        }
        arr [2] = StringUtils.join(times, ", ");

        arr [3] = notes;
        arr [4] = normalDuration.toString();
        arr [5] = eveningDuration.toString();
        arr [6] = saturdayDuration.toString();
        arr [7] = sundayDuration.toString();
        arr [8] = nightDuration.toString();

        return arr;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<TimeSpan> getWorkTimes() {
        return workTimes;
    }

    public void setWorkTimes(List<TimeSpan> workTimes) {
        this.workTimes = workTimes;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public TimeDuration getNormalDuration() {
        return normalDuration;
    }

    public void setNormalDuration(TimeDuration normalDuration) {
        this.normalDuration = normalDuration;
    }

    public TimeDuration getEveningDuration() {
        return eveningDuration;
    }

    public void setEveningDuration(TimeDuration eveningDuration) {
        this.eveningDuration = eveningDuration;
    }

    public TimeDuration getSaturdayDuration() {
        return saturdayDuration;
    }

    public void setSaturdayDuration(TimeDuration saturdayDuration) {
        this.saturdayDuration = saturdayDuration;
    }

    public TimeDuration getSundayDuration() {
        return sundayDuration;
    }

    public void setSundayDuration(TimeDuration sundayDuration) {
        this.sundayDuration = sundayDuration;
    }

    public TimeDuration getNightDuration() {
        return nightDuration;
    }

    public void setNightDuration(TimeDuration nightDuration) {
        this.nightDuration = nightDuration;
    }
}
