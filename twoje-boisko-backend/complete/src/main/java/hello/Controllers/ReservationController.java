package hello.Controllers;
import hello.Helpers.Index_;
import hello.Helpers.*;
import hello.Models.*;
import hello.Services.*;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/res")
@RestController
public class ReservationController {

    @Autowired
    ReservationsService reservationsService;
    @Autowired
    SportObjectService sportObjectService;

    private HttpHeaders responseHeaders;
    public ReservationController(){
        responseHeaders = new HttpHeaders();
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/add", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> addReservation(@RequestBody Reservation reservation) {
        Reservation result = reservationsService.addReservation(reservation);
        switch(result.getId()){
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("prawdopodobnie podales zle dane"));
            case -2:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("blad polaczenia"));
		    default :
                return ResponseEntity.ok(result);
        }
        
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/update", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> updateReservation(@RequestBody Reservation reservation) {
        Reservation result = reservationsService.updateReservation(reservation);
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
    public ResponseEntity<?> deleteReservation(@RequestBody Index_ id) {
        Boolean tmp = reservationsService.deleteReservation(id.getId());
        if ( tmp ) id.setValue("usunieto");
        else id.setValue("blad przy usuwaniu");
        return ResponseEntity.accepted().body(id);

    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value = "/find", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> findReservation(@RequestParam(value="id", required = true) String id) {
        Reservation result = reservationsService.findReservation(Integer.parseInt(id));
        switch(result.getId()){
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("blad polaczenia"));
		    default :
                return ResponseEntity.ok(result);
        }

    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value = "/find_o", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> findReservationObject(@RequestParam(value="id", required = true) String id) {
        return ResponseEntity.accepted().body(reservationsService.findReservationsObject(Integer.parseInt(id)));

    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value = "/find_u", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> findReservationuser(@RequestParam(value="id", required = true) String id) {
        return ResponseEntity.accepted().body(reservationsService.findReservationsUser(Integer.parseInt(id)));

    }

    @RequestMapping(value = "/all")
    @ResponseBody
    public ResponseEntity<?> getallrest() {
        return ResponseEntity.accepted().body(reservationsService.getAllReservations());

    }
    @RequestMapping(value = "/allboosted")
    @ResponseBody
    public ResponseEntity<?> getallrestboosted() {
        List<Reservation> all  = reservationsService.getAllReservations();
        List<Boosted<Reservation,SportObject>> boosted = new ArrayList<>();
        for (Reservation var : all) {
            SportObject ob = sportObjectService.findSportObjectById(var.getIdObject());
            boosted.add(new Boosted<Reservation,SportObject>(var, ob));
        }
        return ResponseEntity.ok(boosted);
    }




}