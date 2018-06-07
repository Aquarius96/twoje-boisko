package hello.Controllers;
import hello.Helpers.Index_;
import hello.Helpers.Result_;
import hello.Models.*;
import hello.Services.*;


import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value="/object")
public class ObjectController{

    private SportObjectService con;
    private HttpHeaders responseHeaders;
    public ObjectController(){
        responseHeaders = new HttpHeaders();
        con = new SportObjectService(); 

    }
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value ="/add", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> addSportObject(@RequestBody SportObject sportObject) {
        SportObject result = con.addSportObject(sportObject);
        switch(result.getId()){
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("prawdopodobnie podales zle dane"));
            case -2:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("blad polaczenia"));
		    default :
                return ResponseEntity.ok(result);
        }

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> deleteSportObject(@RequestBody Index_ id) {
        Boolean tmp = con.deleteSportObject(id.getId());
        if ( tmp ) id.setValue("usunieto");
        else id.setValue("blad przy usuwaniu");
        return ResponseEntity.accepted().body(id);

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value ="/update", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> updateObject(@RequestBody SportObject object) {
        SportObject result = con.updateSportObject(object);
        switch(result.getId()){
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("prawdopodobnie podales zle dane"));
            case -2:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("blad polaczenia"));
		    default :
                return ResponseEntity.ok(result);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/allObjects")
    public ResponseEntity<?> getSportObject(){
        return ResponseEntity.accepted().body(con.getAllSportObjects());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/findC", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> findObjectC(@RequestParam(value="city", required = true) String city) {
        return ResponseEntity.accepted().body(con.findSportObjectsByCity(city));

    }
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/find", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> findObject(@RequestParam(value="id", required = true) String id) {
        SportObject result = con.findSportObjectById(Integer.parseInt(id));
        switch(result.getId()){
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("blad polaczenia"));
		    default :
                return ResponseEntity.ok(result);
        }

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/allTypes")
    public ResponseEntity<?> getTypes(){
        return ResponseEntity.accepted().body(con.getAllTypes());
    }
}