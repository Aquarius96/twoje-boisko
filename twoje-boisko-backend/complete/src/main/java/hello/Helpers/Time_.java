package hello.Helpers;
import java.time.*;
import java.time.format.DateTimeFormatter;

public class Time_{

    private ZoneId zoneId = ZoneId.of("Europe/Warsaw");
    private LocalTime localTime;
    private DateTimeFormatter format = DateTimeFormatter.ofPattern("HH:mm:ss");
 

    public String getTime_string(){
        localTime=LocalTime.now(zoneId);
        return localTime.format(format);
    }

    public LocalTime getTime(){
        return LocalTime.now(zoneId);
    }
}