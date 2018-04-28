package hello.Controllers;

import hello.Helpers.BCrypt;
import hello.Helpers.Index_;
import hello.Helpers.Mail_;
import hello.Models.*;
import hello.Services.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


import javax.mail.MessagingException;
import javax.mail.internet.AddressException;



@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/user")
@RestController
public class UserController {

    private  UserService con;
    private Mail_ mail;

    public UserController(){
        con = new UserService();
        mail = new Mail_();
    }


    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/confirm",method = RequestMethod.POST)
    @ResponseBody
    public User Confirm(@RequestBody Index_ index) {

        User tmp = con.findUserById(index.getId());
        if (tmp.getCode().equals(index.getValue())) {
            tmp.setConfirm(true);
            tmp.setCode(null);
            return con.updateUser(tmp);
        }
        else return new User(-10); //zly confirmcode czy cos
        
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/forgot/email",method = RequestMethod.POST)
    @ResponseBody
    public String ForgotEmail(@RequestBody Index_ email) throws AddressException, MessagingException {

        User user = con.findUserByEmail(email.getValue());
        if (user.getId()<0) return "Brak uzytkownika o danym emailu"; // lub do poprawy i we froncie zmienicie wiadomosc
        mail.ForgotEmail(user);
        return "Wyslano emaila";
        
    }
    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/forgot/login",method = RequestMethod.POST)
    @ResponseBody
    public String ForgotLogin(@RequestBody Index_ email) throws AddressException, MessagingException {

        User user = con.findUserByEmail(email.getValue());
        if (user.getId()<0) return "Brak uzytkownika o danym emailu"; // lub do poprawy i we froncie zmienicie wiadomosc
        return user.getUsername();
        
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/signin", method = RequestMethod.POST)
    @ResponseBody
    public User logging(@RequestBody User_abs user_abs) {
        Integer index = con.checkUser(user_abs);
        User zalogowany;
        if (index >= 0) zalogowany = con.findUserById(index);
        else zalogowany = new User(index);
        return  zalogowany;
        
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/signup", method = RequestMethod.POST)
    @ResponseBody
    public User addUser(@RequestBody User user) throws AddressException, MessagingException {
        Integer tmp = con.checkUser(user); 

        if (tmp == 0){
            user.setId(con.getfreeId());
            user.setConfirm(false);
            UUID uuid = UUID.randomUUID();
            user.setCode(uuid.toString());
            String pw_hash = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()); 
            user.setPassword(pw_hash);
            User user_ = con.addUser(user);
            if (user_.getId() >= 0 ) {
                mail.ConfirmEmail(user_);
                return user_;
            }
            else return new User(-5); //* blad w serwiscie przy dodawaniu
        }
        else if (tmp==1) return new User(-1); //* zajety username
        else if (tmp==2) return new User(-2); //* zajety email
        else if (tmp==3) return new User(-3);// zajete wszystko
        return new User(-4); //* blad z polaczeniem
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/update", method = RequestMethod.POST)
    @ResponseBody
    public User updateUser(@RequestBody User user) {
        if (con.checkUpdater(user)) return con.updateUser(user);
        return new User(-1);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    @ResponseBody
    public String deleteUser(@RequestParam(value="id", required = true) String id) {
        Boolean tmp = con.deleteUser(Integer.parseInt(id));
        if ( tmp ) return "usunieto";
        else return "blad przy usuwaniu";

    }
 
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/allUsers")
    public List<User> getUsers(){
        return con.getAllUsers();
    } 

    
}
