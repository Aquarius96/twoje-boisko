package hello.Helpers;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import hello.Models.User;

public class Mail_
{
    static Properties mailServerProperties;
	static Session getMailSession;
    static MimeMessage generateMailMessage;
    
    public Mail_(){

    }
    
    public User start(User user_) throws AddressException, MessagingException {

       generateAndSendEmail(user_);
        return user_;
    }


    public static void generateAndSendEmail(User user) throws AddressException, MessagingException {
        
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
		generateMailMessage.setSubject(user.getUsername() + " witamy w naszym serwisie!");
		String emailBody = "W celu zakonczenia rejestracji prosimy o przejscie na ponizszy link: " + "<br>" + "<a href=\"http://localhost:3000/confirm/" + user.getId() + "/" + user.getCode() + "\">Link aktywacyjny</a> <br> Klucz : " + user.getCode() + "<br />UserId : " + user.getId() + "<br><br> Usciski, <br>AdminBOT";
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
            System.out.println("Error mail: "+e);
        }

		
    }
    
    
}