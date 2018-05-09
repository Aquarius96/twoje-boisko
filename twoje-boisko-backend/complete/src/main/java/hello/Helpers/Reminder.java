package hello.Helpers;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import hello.Models.*;
import hello.Services.*;

public class Reminder{
    static Properties mailServerProperties;
	static Session getMailSession;
    static MimeMessage generateMailMessage;
    private UserService _us;
    private SportObjectService _ss;

    public Reminder(){
        _us = new UserService();
        _ss = new SportObjectService();
    }

    public void sendReminder(Reservation reservation) throws MessagingException{

        User user = _us.findUserById(reservation.getIdUser());
        SportObject object = _ss.findSportObject(reservation.getIdObject());
        if (!user.getRemind()) return;
        try{
            // Step1
            //System.out.println("\n 1st ===> setup Mail Server Properties..");
            mailServerProperties = System.getProperties();
            mailServerProperties.put("mail.smtp.port", "587");
            mailServerProperties.put("mail.smtp.auth", "true");
            mailServerProperties.put("mail.smtp.starttls.enable", "true");
            //System.out.println("Mail Server Properties have been setup successfully..");
     
            // Step2
            //System.out.println("\n\n 2nd ===> get Mail Session..");
            getMailSession = Session.getDefaultInstance(mailServerProperties, null);
            generateMailMessage = new MimeMessage(getMailSession);
            generateMailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(user.getEmail()));
            generateMailMessage.setSubject("Twoja rezerwacja :"+object.getName()+" rozpocznie sie za godzine!");
            String emailBody = "Witaj "+user.getUsername()+"!<br>Pragniemy Ci przypomniec ze Twoja rezerwacja obiektu: "+object.getName()+" rozpocznie sie o "+reservation.getHourStart()+":00 i zakonczy o "+reservation.getHourEnd()+":00<br>Nasz "+object.getType()+" jest do Twojej dyspozycji. Milych wypocin!<br>W razie problemow (takich jak np  lokalizacja obiektu badz jego cena) prosimy przejsc na strone:<br><a href=\"http://localhost:3000/object/" + object.getId() + "\">"+object.getName()+"</a> <br><br> Usciski, <br>AdminBOT!";
            generateMailMessage.setContent(emailBody, "text/html");
            //System.out.println("Mail Session has been created successfully..");
     
            // Step3
            //System.out.println("\n\n 3rd ===> Get Session and Send mail");
            Transport transport = getMailSession.getTransport("smtp");
            transport.connect("smtp.gmail.com", "twojeboisko@gmail.com", "zaq1@WSX");
            transport.sendMessage(generateMailMessage, generateMailMessage.getAllRecipients());
            transport.close();
            
            }
            catch(AddressException e)
            {
                System.out.println("Error mail remind: "+e);
            }
    }
    
}