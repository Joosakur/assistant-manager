package fi.helsinki.cs.joosakur.asmgr.sheet;

import java.time.Duration;
import java.util.function.Function;

public class DurationFormatter implements Function<Duration, String> {
    @Override
    public String apply(Duration duration) {
        if(duration.isZero())
            return "";

        long hours = duration.toHours();
        long minutes = duration.toMinutes() - hours*60;
        String string = "" + hours;
        if(minutes == 0)
            return string;
        else if(minutes < 10)
            return string + ":0" +minutes;
        else
            return string + ":" + minutes;
    }
}
