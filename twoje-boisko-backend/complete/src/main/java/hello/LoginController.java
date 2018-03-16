package hello;



import java.beans.Statement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {



    @RequestMapping(value = "/logowanie", method = RequestMethod.GET)
    public User_abs user_abs(@RequestParam(value="login", required = true) String login,
                                @RequestParam(value="passwd", required = true) String password) {
        return new User_abs(login,password); // porownac tego usera z dana userow
    }

    @RequestMapping(value = "/log")
    public String test(){
        String name = "nie dzila";
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://orfi.uwm.edu.pl/~s136308:22", "s136310", "WcotvdIS90fv");
            Statement smt = (Statement) con.createStatement(); //Create Statement to interact
            String string = "select * from pracownicy";
			ResultSet r = ((java.sql.Statement) smt).executeQuery(string);
            while (r.next()) {
              name = r.getString("name");
            }
            con.close();
       } catch (Exception e) {
            e.printStackTrace();
       }
       return name;
    }
    
}
