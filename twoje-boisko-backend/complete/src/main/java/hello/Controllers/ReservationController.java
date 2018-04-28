package hello.Controllers;
import hello.Models.*;
import hello.Services.*;

import java.util.List;

import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/res")
@RestController
public class ReservationController {

    private ReservationsService con ;
    public ReservationController(){
        con = new ReservationsService();
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/add", method = RequestMethod.POST)
    @ResponseBody
    public Reservation addReservation(@RequestBody Reservation reservation) {
        reservation.setId(con.getfreeId());
        return con.addReservation(reservation);
        
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/update", method = RequestMethod.POST)
    @ResponseBody
    public Reservation updateReservation(@RequestBody Reservation reservation) {
        return con.updateReservation(reservation);
        
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    @ResponseBody
    public String deleteReservation(@RequestParam(value="id", required = true) String id) {
        Boolean tmp = con.deleteReservation(Integer.parseInt(id));
        if ( tmp ) return "usunieto";
        else return "blad przy usuwaniu";

    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value = "/find", method = RequestMethod.GET)
    @ResponseBody
    public Reservation findReservation(@RequestParam(value="id", required = true) String id) {
        return con.findReservation(Integer.parseInt(id));

    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value = "/find_o", method = RequestMethod.GET)
    @ResponseBody
    public List<Reservation> findReservationObject(@RequestParam(value="id", required = true) String id) {
        return con.findReservationsObject(Integer.parseInt(id));

    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value = "/find_u", method = RequestMethod.GET)
    @ResponseBody
    public List<Reservation> findReservationuser(@RequestParam(value="id", required = true) String id) {
        return con.findReservationsUser(Integer.parseInt(id));

    }

    @RequestMapping(value = "/all")
    @ResponseBody
    public List<Reservation> getallrest() {
        return con.getAllReservations();

    }


}