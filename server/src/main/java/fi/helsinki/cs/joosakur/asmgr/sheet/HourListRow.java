package fi.helsinki.cs.joosakur.asmgr.sheet;

import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public abstract class HourListRow {

    private LocalDate date;
    private List<TimeSpan> workTimes;

    protected abstract boolean isSick();
    protected abstract boolean isWorking();

    public HourListRow(LocalDate date, List<TimeSpan> workTimes) {
        this.date = date;
        this.workTimes = workTimes;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getWeekdayString() {
        switch (getDate().getDayOfWeek()) {
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

    public List<TimeSpan> getWorkTimes() {
        return workTimes;
    }

    public Duration getNormalDuration() {
        return getWorkTimes().stream()
                .map(TimeSpan::getDuration)
                .reduce(Duration.ZERO, Duration::plus);
    }

    public Duration getEveningDuration() {
        return Duration.ZERO;
    }

    public Duration getSundayDuration() {
        return Duration.ZERO;
    }

    public Duration getSaturdayDuration() {
        return Duration.ZERO;
    }

    public String getNotes() {
        return "";
    }

    public Duration getNightDuration() {
        return Duration.ZERO;
    }

    public List<String> toColumnValueStrings() {
        List<String> strings = new ArrayList<>(9);

        strings.add(DateTimeFormatter.ofPattern("dd.MM.yyyy").format(getDate()));
        strings.add(getWeekdayString());

        String times = getWorkTimes().stream()
                .map(TimeSpan::toString)
                .collect(Collectors.joining(", "));
        strings.add(times);

        strings.add(getNotes());

        DurationFormatter formatter = new DurationFormatter();
        strings.add(formatter.apply(getNormalDuration()));
        strings.add(formatter.apply(getEveningDuration()));
        strings.add(formatter.apply(getSaturdayDuration()));
        strings.add(formatter.apply(getSundayDuration()));
        strings.add(formatter.apply(getNightDuration()));

        return strings;
    }

}
