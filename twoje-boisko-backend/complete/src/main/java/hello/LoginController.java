package hello;

import java.util.List;

import org.springframework.web.bind.annotation.*;





@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LoginController {

    

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/logowanie", method = RequestMethod.POST)
    @ResponseBody
    public User logging(@RequestBody User_abs user_abs) {
        UserService con = new UserService();
        Integer index = con.checkUser(user_abs);
        User zalogowany;
        if (index >= 0) zalogowany = con.findUser(index);
        else zalogowany = new User(index);
        return  zalogowany;
        
    }

    

    //! dodawanie dziala ale ze zwroceniem dobrego objectu jest cos probelm
    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/add", method = RequestMethod.POST)
    @ResponseBody
    public User addUSer(@RequestBody NewUser newuser) {
        UserService con = new UserService();
        Integer tmp = con.checkUser(newuser); 
        User nowy = new User(con.getfreeId(),newuser.getUsername(),newuser.getPassword(),newuser.getFirstname(),newuser.getLastname(),newuser.getEmail(),newuser.getPhone());
        
        if (tmp == 1){
            return con.addUser(nowy);
        }
        return new User(-1);
    }


    //! dziala ale parametry trzeba zminic na body
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public String deleteUser(@RequestParam(value="id", required = true) String id) {
        UserService con = new UserService();
        Boolean tmp = con.deleteUser(Integer.parseInt(id));
        if ( tmp ) return "usunieto";
        else return "blad przy usuwaniu";

    }



    //? poprawne :D

    @RequestMapping(value = "/")
	public String index() {
        return "welcome in my word";
    }

    
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/allUsers")
    public List<User> getUsers(){
        UserService con = new UserService();
        return con.getAllUsers();
    }


    //! te tu moga sie przydac ale raczej bd pozniej do wywalenia
    @RequestMapping(value = "/log", method = RequestMethod.GET)
    public User_abs user_abs(@RequestParam(value="login", required = true) String login,
                                @RequestParam(value="passwd", required = true) String password) {
        return new User_abs(login,password); // porownac tego usera z dana userow
    }

    
    



}