package hello.Controllers;

import hello.Helpers.Hash;
import hello.Helpers.Index_;
import hello.Helpers.Mail_;
import hello.Helpers.*;
import hello.Models.*;
import hello.Services.*;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    UserService userService;
    @Autowired
    ReservationsService reservationsService;

    private HttpHeaders responseHeaders;
    private Mail_ mail;
    private Hash hash;
    private ResultDto<?> _result;
    

    public UserController(){
        mail = new Mail_();
        responseHeaders = new HttpHeaders();
        hash = new Hash();
        _result = new ResultDto<>();

    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/newpaswd", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> changepaswdafterforgot(@RequestBody PaswdDto2 user) {
        if (userService.checkPaswd(user.getId(), user.getPaswd())){
            return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Nowe haslo nie moze byc takie same jak stare"));
        }
        return ResponseEntity.accepted().headers(responseHeaders).body(userService.changePaswdafterForgot(user.getId(), user.getPaswd()));
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/getConCode",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> getConCode(@RequestBody Index_ code){
        return ResponseEntity.accepted().headers(responseHeaders).body(userService.getConCode(code.getId()).equals(code.getValue()));
    }   

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/confirm",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> Confirm(@RequestBody Index_ index) {
        User result;
        User tmp = userService.findUserById(index.getId());
        if (tmp.getCode().equals(index.getValue())) {
            tmp.setConfirm(true);
            tmp.setCode(null);
            result = userService.updateUser(tmp);
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
        User user = userService.findUserByEmail(email.getValue());
        if (user.getId()<0){
            return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Brak uzytkownika o danym emailu"));
        }
        if (!user.getConfirm()){
            return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Aktywuj konto przed proba przypoknnienia hasla!"));
        }
        UUID uuid = UUID.randomUUID();
        user.setCode(hash.getFreshHash(uuid.toString()));
        
        switch(userService.updateUser(user).getId()){
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Zle dane"));
            case -2:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Bład w polaczeniu"));
            default :
                _result = mail.ForgotPasswdEmail(user);
                if (_result.isError()) return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_( _result.getErrors().get(0)));
                return ResponseEntity.ok(_result.getSUccesedResult());
        }
        
    }
    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/forgot/login",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> ForgotLogin(@RequestBody Index_ email){

        User user = userService.findUserByEmail(email.getValue());
        if (user.getId()<0){
            return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Brak uzytkownika o danym emailu"));
        }
        _result = mail.ForgotLoginEmail(user);
        if (_result.isError()) return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_( _result.getErrors().get(0)));
        return ResponseEntity.ok(_result.getSUccesedResult());
        
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/signin", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> logging(@RequestBody User_abs user_abs) {
        Integer index = userService.tryToLoggIn(user_abs);
        User result;
        switch(index){
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Zly login"));
            case -2:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Zle haslo"));
            case -3:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Blad w polaczeniu"));
            default :
                result = userService.findUserById(index);
                if (result.getId()>=0) return ResponseEntity.ok(result);
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Blad w polaczeniu"));
        }
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/signup", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> addUser(@RequestBody User user) throws AddressException, MessagingException {
        Integer tmp = userService.checkUser(user); 
        //ResultDto<String> result = new ResultDto<>();

        switch (tmp){
            case 0:
            User res = userService.addUser(user);
            switch (res.getId()){
                case -1:
                    return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Zle dane"));
                case -2:
                    return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Bład w polaczeniu"));
                default :
                    _result = mail.ConfirmEmail(res);
                    if (_result.isError()) return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_( _result.getErrors().get(0)));
                    return ResponseEntity.ok(_result.getSUccesedResult());
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
        return ResponseEntity.accepted().headers(responseHeaders).body(userService.changePaswd(user.getId(), user.getOldpaswd(), user.getNewpaswd()));
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/checkpaswd", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> checkpaswd(@RequestBody PaswdDto2 user) {
        return ResponseEntity.accepted().headers(responseHeaders).body(userService.checkPaswd(user.getId(), user.getPaswd()));
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/update", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        switch(userService.checkUpdater(user)){
            case 1:
                User result = userService.updateUser(user);
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

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/update/hash", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> updateUserhash(@RequestBody User user) {
        user = userService.haszujUsera(user);
        switch(userService.checkUpdater(user)){
            case 1:
                User result = userService.updateUser(user);
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
        if (userService.deleteUser(id.getId())){
            if (reservationsService.deleteReservationForUser(id.getId())){
                return ResponseEntity.ok("Pomyslnie usunieto");
            }
            return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Blad przy usuwaniu rezerwacji uzytkonika"));
        }
        return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Blad przy usuwaniu uzytkownial"));

        
    }
 
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/allUsers")
    public ResponseEntity<?> getUsers(){
        return ResponseEntity.accepted().headers(responseHeaders).body(userService.getAllUsers());
    } 

    
}
