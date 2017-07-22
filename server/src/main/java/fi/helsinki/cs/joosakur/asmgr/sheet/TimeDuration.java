package fi.helsinki.cs.joosakur.asmgr.sheet;

public class TimeDuration {
    private int hours;
    private int minutes;

    public TimeDuration(TimeSpan timeSpan) {
        if(timeSpan == null || timeSpan.getStartTime()==null || timeSpan.getEndTime()==null)
            return; //default 0h 0min

        int duration = timeSpan.getEndTime().getTotalInMinutes() - timeSpan.getStartTime().getTotalInMinutes();
        if(duration < 0) throw new IllegalArgumentException("Negative duration");
        hours = duration / 60;
        minutes = duration % 60;
    }

    public TimeDuration(int hours, int minutes) {
        this.hours = hours;
        this.minutes = minutes;
    }

    public TimeDuration() {
    }

    public TimeDuration add(TimeDuration d2) {
        this.hours += d2.hours;
        this.minutes += d2.minutes;
        if(this.minutes > 59) {
            this.hours++;
            this.minutes -= 60;
        }
        return this;
    }

    public boolean isZero() {
        return hours==0 && minutes==0;
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

    @Override
    public String toString() {
        if(hours == 0 && minutes == 0)
            return "";

        String string = "" + hours;
        if(minutes > 0)
            string += ":" + minutes;
        return string;
    }
}
