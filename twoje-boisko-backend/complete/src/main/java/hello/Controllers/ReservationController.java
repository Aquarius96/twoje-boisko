package hello.Controllers;
import hello.Helpers.Index_;
import hello.Helpers.Result_;
import hello.Models.*;
import hello.Services.*;


import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/res")
@RestController
public class ReservationController {

    private ReservationsService con ;
    private HttpHeaders responseHeaders;
    public ReservationController(){
        responseHeaders = new HttpHeaders();
        con = new ReservationsService();
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/add", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> addReservation(@RequestBody Reservation reservation) {
        reservation.setId(con.getfreeId());
        Reservation result = con.addReservation(reservation);
        switch(result.getId()){
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("prawdopodobnie podales zle dane"));
            case -2:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("blad polaczenia"));
		    default :
                return ResponseEntity.ok(result);
        }
        
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/update", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> updateReservation(@RequestBody Reservation reservation) {
        Reservation result = con.updateReservation(reservation);
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
    public ResponseEntity<?> deleteReservation(@RequestBody Index_ id) {
        Boolean tmp = con.deleteReservation(id.getId());
        if ( tmp ) id.setValue("usunieto");
        else id.setValue("blad przy usuwaniu");
        return ResponseEntity.accepted().body(id);

    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value = "/find", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> findReservation(@RequestParam(value="id", required = true) String id) {
        Reservation result = con.findReservation(Integer.parseInt(id));
        switch(result.getId()){
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Result_("blad polaczenia"));
		    default :
                return ResponseEntity.ok(result);
        }

    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value = "/find_o", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> findReservationObject(@RequestParam(value="id", required = true) String id) {
        return ResponseEntity.accepted().body(con.findReservationsObject(Integer.parseInt(id)));

    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value = "/find_u", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> findReservationuser(@RequestParam(value="id", required = true) String id) {
        return ResponseEntity.accepted().body(con.findReservationsUser(Integer.parseInt(id)));

    }

    @RequestMapping(value = "/all")
    @ResponseBody
    public ResponseEntity<?> getallrest() {
        return ResponseEntity.accepted().body(con.getAllReservations());

    }


}