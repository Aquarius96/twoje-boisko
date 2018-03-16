package hello;

import java.util.List;

import org.springframework.web.bind.annotation.*;


@RestController
public class LoginController {



    @RequestMapping(value = "/logowanie", method = RequestMethod.GET)
    public User_abs user_abs(@RequestParam(value="login", required = true) String login,
                                @RequestParam(value="passwd", required = true) String password) {
        return new User_abs(login,password); // porownac tego usera z dana userow
    }

    @RequestMapping(value = "/allUsers")
    public List<User> test(){
        DBconnector con = new DBconnector();
        return con.getAllUsers();
    }
    
}