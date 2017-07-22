package fi.helsinki.cs.joosakur.asmgr.sheet;

public class TimeSpan {
    private Time startTime;
    private Time endTime;
    private TimeDuration duration;

    public TimeSpan(Time startTime, Time endTime) {
        if(startTime!=null && endTime!=null && startTime.after(endTime))
            throw new IllegalArgumentException("Time goes backwards");
        this.startTime = startTime;
        this.endTime = endTime;
        this.duration = new TimeDuration(this);
    }

    public TimeSpan intersection(TimeSpan ts2) {
        if(this.endTime.before(ts2.startTime) || this.startTime.after(ts2.endTime))
            return new TimeSpan(null, null);
        else if(this.startTime.before(ts2.startTime)) {
            if(this.endTime.before(ts2.endTime))
                return new TimeSpan(ts2.startTime.getCopy(), this.endTime.getCopy());
            else
                return new TimeSpan(ts2.startTime.getCopy(), ts2.endTime.getCopy());
        }
        else {
            if(this.endTime.before(ts2.endTime))
                return new TimeSpan(this.startTime.getCopy(), this.endTime.getCopy());
            else
                return new TimeSpan(this.startTime.getCopy(), ts2.endTime.getCopy());
        }
    }

    public Time getStartTime() {
        return startTime;
    }

    public Time getEndTime() {
        return endTime;
    }

    public TimeDuration getDuration() {
        if(duration == null)
            duration = new TimeDuration(this);
        return duration;
    }

    @Override
    public String toString() {
        return startTime.toString() + "-" + endTime.toString();
    }
}
