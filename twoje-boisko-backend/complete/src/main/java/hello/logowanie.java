package hello;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class logowanie {



    @RequestMapping(value = "/logowanie", method = RequestMethod.GET)
    public User_abs user_abs(@RequestParam(value="login", required = true) String login,
                                @RequestParam(value="passwd", required = true) String password) {
        return new User_abs(login,password);
    }

    
}
