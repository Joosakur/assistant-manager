package fi.helsinki.cs.joosakur.asmgr.sheet;

import java.time.Duration;
import java.time.LocalTime;
import java.util.Optional;

/**
 * This class represents an immutable range of time during one day and its duration.
 */
public class TimeSpan {
    private final Time24 startTime;
    private final Time24 endTime;
    private final Duration duration;

    public TimeSpan(Time24 startTime, Time24 endTime) {
        if(startTime.isAfter(endTime))
            throw new IllegalArgumentException("Time goes backwards");
        this.startTime = startTime;
        this.endTime = endTime;

        if(endTime.getHour() == 24)
            this.duration = Duration.between(startTime.toLocalTime(), LocalTime.MIDNIGHT).plusDays(1);
        else
            this.duration = Duration.between(startTime.toLocalTime(), endTime.toLocalTime());
    }

    public Optional<TimeSpan> intersection(TimeSpan ts2) {
        TimeSpan intersection;

        if(this.endTime.isBefore(ts2.startTime) || this.startTime.isAfter(ts2.endTime))
            intersection = null;
        else if(this.startTime.isBefore(ts2.startTime)) {
            if(this.endTime.isBefore(ts2.endTime))
                intersection = new TimeSpan(ts2.startTime.clone(), this.endTime.clone());
            else
                intersection = new TimeSpan(ts2.startTime.clone(), ts2.endTime.clone());
        }
        else {
            if(this.endTime.isBefore(ts2.endTime))
                intersection = new TimeSpan(this.startTime.clone(), this.endTime.clone());
            else
                intersection = new TimeSpan(this.startTime.clone(), ts2.endTime.clone());
        }

        return Optional.ofNullable(intersection);
    }

    public Duration intersectionDuration(TimeSpan ts2) {
        Optional<TimeSpan> intersection = intersection(ts2);
        if(intersection.isPresent())
            return intersection.get().duration;
        return Duration.ZERO;
    }



    public Time24 getStartTime() {
        return startTime;
    }

    public Time24 getEndTime() {
        return endTime;
    }

    public Duration getDuration() {
        return duration;
    }

    @Override
    public String toString() {
        return startTime.toString() + "-" + endTime.toString();
    }
}
