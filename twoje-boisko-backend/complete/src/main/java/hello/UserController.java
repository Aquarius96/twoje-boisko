package hello;


import org.springframework.web.bind.annotation.*;


import java.util.List;



@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/logging")
@RestController
public class UserController {

    

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
    public User addUSer(@RequestBody NewUser newuser) {
        UserService con = new UserService();
        Integer tmp = con.checkUser(newuser); 

        if (tmp == 0){
            User nowy = new User(con.getfreeId(),newuser.getUsername(),newuser.getPassword(),newuser.getFirstname(),newuser.getLastname(),newuser.getEmail(),newuser.getPhone());
            return con.addUser(nowy);
        }
        else if (tmp==1) return new User(-1); //* zajety username
        else if (tmp==2) return new User(-2); //* zajety email
        return new User(-3); //* zajete wszystko XD
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
