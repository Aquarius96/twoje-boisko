package hello.Controllers;
import hello.Helpers.Index_;
import hello.Models.*;
import hello.Services.*;

import java.util.List;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value="/object")
public class ObjectController{

    private SportObjectService con;
    public ObjectController(){
        con = new SportObjectService(); 

    }
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value ="/add", method = RequestMethod.POST)
    @ResponseBody
    public SportObject addSportObject(@RequestBody SportObject sportObject) {
        sportObject.setId(con.getfreeId());
        return con.addSportObject(sportObject);  
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public Index_ deleteSportObject(@RequestBody Index_ id) {
        Boolean tmp = con.deleteSportObject(id.getId());
        if ( tmp ) id.setValue("usunieto");
        else id.setValue("blad przy usuwaniu");
        return id;

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value ="/update", method = RequestMethod.POST)
    @ResponseBody
    public SportObject updateObject(@RequestBody SportObject object) {
        return con.updateSportObject(object);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/allObjects")
    public List<SportObject> getSportObject(){
        return con.getAllSportObjects();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/findC", method = RequestMethod.GET)
    @ResponseBody
    public List<SportObject> findObjectC(@RequestParam(value="city", required = true) String city) {
        return con.findSportObjectsCity(city);

    }
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/find", method = RequestMethod.GET)
    @ResponseBody
    public SportObject findObject(@RequestParam(value="id", required = true) String id) {
        return con.findSportObject(Integer.parseInt(id));

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/allTypes")
    public List<String> getTypes(){
        return con.getAllTypes();
    }
}