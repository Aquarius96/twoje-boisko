package hello.Controllers;
import hello.Helpers.Index_;
import hello.Helpers.*;
import hello.Models.*;
import hello.Services.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value="/object")
public class ObjectController{

    @Autowired
    SportObjectService sportObjectService;
    @Autowired
    ReservationsService reservationsService;

    private HttpHeaders responseHeaders;
    public ObjectController(){
        responseHeaders = new HttpHeaders();
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value ="/add", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> addSportObject(@RequestBody SportObject sportObject) {
        SportObject result = sportObjectService.addSportObject(sportObject);
        switch(result.getId()){
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("prawdopodobnie podales zle dane"));
            case -2:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("blad polaczenia"));
		    default :
                return ResponseEntity.ok(result);
        }

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> deleteSportObject(@RequestBody Index_ id) {
        if (sportObjectService.deleteSportObject(id.getId())){
            if (reservationsService.deleteReservationForObiect(id.getId())){
                return ResponseEntity.ok("Pomyslnie usunieto");
            }
            return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Blad podczas proby usuwania rezerwacji obiektu"));
        }
        return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Bład podczas proby usuwania obiektu"));

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value ="/update", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> updateObject(@RequestBody SportObject object) {
        SportObject result = sportObjectService.updateSportObject(object);
        switch(result.getId()){
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("prawdopodobnie podales zle dane"));
            case -2:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("blad polaczenia"));
		    default :
                return ResponseEntity.ok(result);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/allObjects")
    public ResponseEntity<?> getSportObject(){
        return ResponseEntity.accepted().body(sportObjectService.getAllSportObjects());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/findC", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> findObjectC(@RequestParam(value="city", required = true) String city) {
        return ResponseEntity.accepted().body(sportObjectService.findSportObjectsByCity(city));

    }
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/find", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> findObject(@RequestParam(value="id", required = true) String id) {
        SportObject result = sportObjectService.findSportObjectById(Integer.parseInt(id));
        switch(result.getId()){
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("blad polaczenia"));
		    default :
                return ResponseEntity.ok(result);
        }

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/allTypes")
    public ResponseEntity<?> getTypes(){
        return ResponseEntity.accepted().body(sportObjectService.getAllTypes());
    }
}