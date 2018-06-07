package hello;

import java.util.Arrays;

import javax.mail.MessagingException;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.Scheduled;

import hello.Helpers.Reminder;
import hello.Models.Reservation;
import hello.Services.ReservationsService;
import hello.Services.UserService;


@SpringBootApplication
public class Application {


    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
        return args -> {

            System.out.println("Let's inspect the beans provided by Spring Boot:");

            String[] beanNames = ctx.getBeanDefinitionNames();
            Arrays.sort(beanNames);
            for (String beanName : beanNames) {
                System.out.println(beanName);
            }

        };
    }
    private UserService _us = new UserService();
    @Scheduled(cron = "0 1 4 * * ?") //! baze danych czyscimy codzinnei o 4:01 
    // "0 0 * * * *" = the top of every hour of every day.
    // "*/10 * * * * *" = every ten seconds.
    // "0 0 8-10 * * *" = 8, 9 and 10 o'clock of every day.
    // "0 0 8,10 * * *" = 8 and 10 o'clock of every day.
    // "0 0/30 8-10 * * *" = 8:00, 8:30, 9:00, 9:30 and 10 o'clock every day.
    // "0 0 9-17 * * MON-FRI" = on the hour nine-to-five weekdays
    // "0 0 0 25 12 ?" = every Christmas Day at midnight
    public void resetCache() {
    _us.clearConCode(); //! usuwanie confirmationCode usersom potweirdzonym -> chodzi o zapomnienie hasla
    }

    private ReservationsService _rs = new ReservationsService();
    private Reminder reminder = new Reminder();
    @Scheduled(cron = "0 0 * * * *") //! co godzine wyslanie przypomnienia dla reserwacji ktore rozpoczynaja sie za godzine
    public void sendReminder() throws MessagingException{
        for (Reservation res : _rs.getReserwationsTorRemind()) {
            reminder.sendReminder(res);
            
        }
    }


}
