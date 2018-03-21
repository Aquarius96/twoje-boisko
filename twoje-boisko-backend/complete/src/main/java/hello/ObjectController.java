package hello;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value="/object")
public class ObjectController{

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/add", method = RequestMethod.POST)
    @ResponseBody
    public SportObject addSportObject(@RequestBody SportObject sportObject) {
        SportObjectService con = new SportObjectService(); 
        sportObject.setId(con.getfreeId());
        return con.addSportObject(sportObject);  
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    @ResponseBody
    public String deleteObject(@RequestParam(value="id", required = true) String id) {
        SportObjectService con = new SportObjectService();
        Boolean tmp = con.deleteSportObject(Integer.parseInt(id));
        if ( tmp ) return "usunieto";
        else return "blad przy usuwaniu";

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/allObjects")
    public List<SportObject> getSportObject(){
        SportObjectService con = new SportObjectService();
        return con.getAllSportObjects();
    }
}