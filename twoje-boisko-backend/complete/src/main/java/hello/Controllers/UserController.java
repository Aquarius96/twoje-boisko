package hello.Controllers;

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

    
    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/confirm",method = RequestMethod.POST)
    @ResponseBody
    public User Confirm(@RequestBody Index_ index) {

        UserService con = new UserService();
        User tmp = con.findUser(index.getId());
        if (tmp.getCode().equals(index.getValue())) {
            tmp.setConfirm(true);
            tmp.setCode(null);
            return con.updateUser(tmp);
        }
        else return new User(-10); //zly confirmcode czy cos
        
    }


    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/signin", method = RequestMethod.POST)
    @ResponseBody
    public User logging(@RequestBody User_abs user_abs) {
        UserService con = new UserService();
        Integer index = con.checkUser(user_abs);
        User zalogowany;
        if (index >= 0) zalogowany = con.findUser(index);
        else zalogowany = new User(index);
        return  zalogowany;
        
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/signup", method = RequestMethod.POST)
    @ResponseBody
    public User addUser(@RequestBody User user) throws AddressException, MessagingException {
        UserService con = new UserService();
        Integer tmp = con.checkUser(user); 

        if (tmp == 0){
            Mail_ mail = new Mail_();
            user.setId(con.getfreeId());
            user.setConfirm(false);
            UUID uuid = UUID.randomUUID();
            user.setCode(uuid.toString());
            return con.addUser(mail.start(user));
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
        UserService con = new UserService();
        if (con.checkUpdater(user)) return con.updateUser(user);
        return new User(-1);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    @ResponseBody
    public String deleteUser(@RequestParam(value="id", required = true) String id) {
        UserService con = new UserService();
        Boolean tmp = con.deleteUser(Integer.parseInt(id));
        if ( tmp ) return "usunieto";
        else return "blad przy usuwaniu";

    }
 
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/allUsers")
    public List<User> getUsers(){
        UserService con = new UserService();
        return con.getAllUsers();
    } 

    
}
