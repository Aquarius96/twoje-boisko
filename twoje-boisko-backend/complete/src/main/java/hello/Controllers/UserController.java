package hello.Controllers;

import hello.Helpers.Hash;
import hello.Helpers.Index_;
import hello.Helpers.Mail_;
import hello.Helpers.*;
import hello.Models.*;
import hello.Services.*;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;




@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/user")
@RestController
public class UserController {

    private  UserService con;
    private HttpHeaders responseHeaders;
    private Mail_ mail;
    private Hash hash;
    private ResultDto<?> result;
    

    public UserController(){
        con = new UserService();
        mail = new Mail_();
        responseHeaders = new HttpHeaders();
        hash = new Hash();
        result = new ResultDto<>();

    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/newpaswd", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> changepaswdafterforgot(@RequestBody PaswdDto2 user) {
        if (con.checkPaswd(user.getId(), user.getPaswd())){
            return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Nowe haslo nie moze byc takie same jak stare"));
        }
        return ResponseEntity.accepted().headers(responseHeaders).body(con.changePaswdafterForgot(user.getId(), user.getPaswd()));
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/getConCode",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> getConCode(@RequestBody Index_ code){
        return ResponseEntity.accepted().headers(responseHeaders).body(con.getConCode(code.getId()).equals(code.getValue()));
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
                    return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("prawdopodobnie podales zle dane"));
                case -2:
                    return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("blad w polaczeniu"));
                default :
                    return ResponseEntity.ok(result);
            }
        }
        return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Podany ConfirmationCode nie pasuje"));
        
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/forgot/password",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> ForgotPassword(@RequestBody Index_ email){

        User user = con.findUserByEmail(email.getValue());
        if (user.getId()<0){
            return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Brak uzytkownika o danym emailu"));
        }
        if (!user.getConfirm()){
            return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Aktywuj konto przed proba przypoknnienia hasla!"));
        }
        UUID uuid = UUID.randomUUID();
        user.setCode(hash.getFreshHash(uuid.toString()));
        
        switch(con.updateUser(user).getId()){
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Zle dane"));
            case -2:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Bład w polaczeniu"));
            default :
                result = mail.ForgotPasswdEmail(user);
                if (result.isError()) return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_( result.getErrors().get(0)));
                return ResponseEntity.ok(result.getResult());
        }
        
    }
    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/forgot/login",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> ForgotLogin(@RequestBody Index_ email){

        User user = con.findUserByEmail(email.getValue());
        if (user.getId()<0){
            return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Brak uzytkownika o danym emailu"));
        }
        result = mail.ForgotLoginEmail(user);
        if (result.isError()) return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_( result.getErrors().get(0)));
        return ResponseEntity.ok(result.getResult());
        
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/signin", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> logging(@RequestBody User_abs user_abs) {
        Integer index = con.checkUser(user_abs);
        User result;
        switch(index){
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Zly login"));
            case -2:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Zle haslo"));
            case -3:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Blad w polaczeniu"));
            default :
                result = con.findUserById(index);
                if (result.getId()>=0) return ResponseEntity.ok(result);
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Blad w polaczeniu"));
        }
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/signup", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> addUser(@RequestBody User user) throws AddressException, MessagingException {
        Integer tmp = con.checkUser(user); 

        switch (tmp){
            case 0:
            User res = con.addUser(user);
            switch (res.getId()){
                case -1:
                    return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Zle dane"));
                case -2:
                    return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Bład w polaczeniu"));
                default :
                    result = mail.ConfirmEmail(res);
                    if (result.isError()) return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_( result.getErrors().get(0)));
                    return ResponseEntity.ok(result.getResult());
            }
            case 1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Username jest zajety"));

            case 2:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Email jest zajety"));
            case 3:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Wszystko jest zajete"));
            default :
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Bład w polaczeniu"));
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
                        return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Zle dane"));
                    case -2:
                        return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Bład w polaczeniu"));
                    default :
                        return ResponseEntity.ok(result);
                }
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Email jest zajety"));
            case -2:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Blad w polaczeniu"));
            default :
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Ups cos poszlo nei tak"));
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> deleteUser(@RequestBody Index_ id) {
        Boolean tmp = con.deleteUser(id.getId());
        if ( tmp ) return ResponseEntity.ok("usunieto");
        return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("blad przy usuwaniu"));
        
    }
 
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/allUsers")
    public ResponseEntity<?> getUsers(){
        return ResponseEntity.accepted().headers(responseHeaders).body(con.getAllUsers());
    } 

    
}
