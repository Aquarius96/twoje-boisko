package hello.Controllers;

import hello.Helpers.Index_;
import hello.Helpers.Mail_;
import hello.Helpers.Result_;
import hello.Models.*;
import hello.Services.*;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import javax.mail.MessagingException;
import javax.mail.internet.AddressException;



@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/user")
@RestController
public class UserController {

    private  UserService con;
    private HttpHeaders responseHeaders;
    private Mail_ mail;

    public UserController(){
        con = new UserService();
        mail = new Mail_();
        responseHeaders = new HttpHeaders();
    }


    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/confirm",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> Confirm(@RequestBody Index_ index) {
        User result;
        User tmp = con.findUserById(index.getId());
        if (tmp.getCode().equals(index.getValue())) {
            tmp.setConfirm(true);
            tmp.setCode(null);
            result = con.updateUser(tmp);
            switch(result.getId()){
                case -1:
                    return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("prawdopodobnie podales zle dane"));
                case -2:
                    return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("blad w polaczeniu"));
                default :
                    return ResponseEntity.ok(result);
            }
        }
        else return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("Podany ConfirmationCode nie pasuje"));
        
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/forgot/password",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> ForgotEmail(@RequestBody Index_ email) throws AddressException, MessagingException {

        User user = con.findUserByEmail(email.getValue());
        if (user.getId()<0){
            email.setValue("Brak uzytkownika o danym emailu");
            return ResponseEntity.accepted().body(email);
        } 
        mail.ForgotEmail(user);
        email.setValue("Wyslano emaila na adres");
        return ResponseEntity.accepted().body(email);
        
    }
    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/forgot/login",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> ForgotLogin(@RequestBody Index_ email) throws AddressException, MessagingException {

        User user = con.findUserByEmail(email.getValue());
        if (user.getId()<0){
            email.setValue("Brak uzytkownika o danym emailu");
            return ResponseEntity.accepted().body(email);
        }
        email.setValue(user.getUsername());
        return ResponseEntity.accepted().body(email);
        
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/signin", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> logging(@RequestBody User_abs user_abs) {
        Integer index = con.checkUser(user_abs);
        User result;
        switch(index){
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("Zly login"));
            case -2:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("Zle haslo"));
            case -3:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("Blad w polaczeniu"));
            default :
                result = con.findUserById(index);
                if (result.getId()>=0) return ResponseEntity.ok(result);
                else return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("Blad w polaczeniu"));
        }
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/signup", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> addUser(@RequestBody User user) throws AddressException, MessagingException {
        Integer tmp = con.checkUser(user); 

        switch (tmp){
            case 0:
            User result = con.addUser(user);
            switch (result.getId()){
                case -1:
                    return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("Zle dane"));
                case -2:
                    return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("Bład w polaczeniu"));
                default :
                    mail.ConfirmEmail(result);
                    return ResponseEntity.ok(result);
            }
            case 1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("Username jest zajety"));

            case 2:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("Email jest zajety"));
            case 3:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("Wszystko jest zajete"));
            default :
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("Bład w polaczeniu"));
        }
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/changepaswd", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> changepaswd(@RequestBody PaswdDto user) {
        return ResponseEntity.accepted().headers(responseHeaders).body(con.changePaswd(user.getId(), user.getOldpaswd(), user.getNewpaswd()));
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/checkpaswd", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> checkpaswd(@RequestBody PaswdDto2 user) {
        return ResponseEntity.accepted().headers(responseHeaders).body(con.checkPaswd(user.getId(), user.getPaswd()));
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/update", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        switch(con.checkUpdater(user)){
            case 1:
                User result = con.updateUser(user);
                switch(result.getId()){
                    case -1:
                        return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("Zle dane"));
                    case -2:
                        return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("Bład w polaczeniu"));
                    default :
                        return ResponseEntity.ok(result);
                }
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("Email jest zajety"));
            case -2:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("Blad w polaczeniu"));
            default :
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("Ups cos poszlo nei tak"));
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> deleteUser(@RequestBody Index_ id) {
        Boolean tmp = con.deleteUser(id.getId());
        if ( tmp ) id.setValue("usunieto");
        else id.setValue("blad przy usuwaniu");
        return ResponseEntity.ok(id);

    }
 
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/allUsers")
    public ResponseEntity<?> getUsers(){
        return ResponseEntity.accepted().headers(responseHeaders).body(con.getAllUsers());
    } 

    
}
