package hello.Services;

import hello.Models.*;
import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.stream.Collectors;


public class ReservationsService{
    private Connection con;
    private Statement st;
    private ResultSet rs;

    private List<Reservation> outList ;
    private List<Reservation> contex;

    public ReservationsService(){
        
        try{
            Class.forName("com.mysql.jdbc.Driver");

            con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/zeto?useUnicode=yes&characterEncoding=UTF-8","root","");
            st = con.createStatement();

        }catch(Exception exception){
            System.out.println("Error connection: "+exception);
        }
        reload();
    }

    public void reload(){
        contex = getReservationsFromDB();
    }

    public List<Reservation> getAllReservations(){
        return contex;
    }
    public List<Reservation> getReservationsFromDB(){
        outList = new ArrayList<>();
        try{
            String task = "SELECT * FROM reservations";
            rs = st.executeQuery(task);
            
			while (rs.next()){
                Reservation tmp = new Reservation();
                tmp.setId(rs.getInt("id"));
                tmp.setDateDay(rs.getString("dateDay"));
                tmp.setHourEnd(rs.getString("hourEnd"));
                tmp.setHourStart(rs.getString("hourStart"));
                tmp.setIdObject(rs.getInt("idObject"));
                tmp.setIdUser(rs.getInt("idUser"));
                outList.add(tmp);
            }
        }catch (Exception exception){
            System.out.println("Error all_reservations: "+exception);
        }
		return outList;
    }
    
    private Integer getfreeId(){
        Integer result=0;
        for (Reservation reservation : contex) {
            if (reservation.getId()!=result) break;
            result += 1;
        }
        return result;
    }

    public Reservation addReservation(Reservation reservation) {
        Reservation reservation_ = new Reservation();
        reservation.setId(getfreeId());
        try{
            String task = "INSERT INTO reservations (`id`, `dateDay`, `hourStart`, `hourEnd`, `idObject`, `idUser`) VALUES ('"+reservation.getId()+"', '"+reservation.getDateDay()+"', '"+reservation.getHourStart()+"', '"+reservation.getHourEnd()+"', '"+reservation.getIdObject()+"', '"+reservation.getIdUser()+"');";
            Integer tmp = st.executeUpdate(task);
            if (tmp==1) reservation_ = reservation;
            else {
                reservation_.setId(-1);System.out.println("Error add_reservation: zle dane najprawdopodnobnmiej");
            }
            
        }catch (Exception exception){
            System.out.println("Error add_reservation(polacznei): "+exception);
            reservation_.setId(-2);
        }
        reload();
        return reservation_;
    }

    public Reservation updateReservation(Reservation reservation){
        Reservation result = new Reservation();
        try{
            String task = "UPDATE reservations SET dateDay='"+reservation.getDateDay()+"', hourStart='"+reservation.getHourStart()+"', hourEnd='"+reservation.getHourEnd()+"', idObject='"+reservation.getIdObject()+"', idUser='"+reservation.getIdUser()+"' WHERE id = '"+reservation.getId()+";";
            Integer tmp = st.executeUpdate(task);
            if (tmp == 1) {
                result.setId(reservation.getId());
                result.setDateDay(reservation.getDateDay());
                result.setHourEnd(reservation.getHourEnd());
                result.setHourStart(reservation.getHourStart());
                result.setIdObject(reservation.getIdObject());
                result.setIdUser(reservation.getIdUser());
            }
            else {
                System.out.println("Error update_reservation: zle dane najprawdopodnobnmiej");
                result.setId(-1);
            }
                
        }catch (Exception exception){
            System.out.println("Error update_reservation (polaczenie): "+exception);
            result.setId(-2);
        }
        reload();
        return result;
    }

    public Boolean deleteReservation(Integer id){
        
        Boolean result;
        try{
            String task = "DELETE FROM reservatios WHERE id=\""+id+"\"";
            Integer tmp = st.executeUpdate(task);
            if (tmp==1) result = true;
            else {
                System.out.println("Error delete_eeservation: zle id");
                result = false;
            }
        
        }catch(Exception exception){
            System.out.println("Error delete_reservation(polaczenie): "+exception);
            result = false;
        }
        reload();
        return result;
    }

    public Reservation findReservation(Integer id){
        outList = contex.stream().filter(x->x.getId()==id).collect(Collectors.toList());
        if (!outList.isEmpty()) return outList.get(0);
        else return new Reservation(-1);
    }

    public List<Reservation> findReservationsObject(Integer id){
        outList = contex.stream().filter(x->x.getIdObject()==id).collect(Collectors.toList());
        return outList;
    }

    public List<Reservation> findReservationsUser(Integer id){
        outList = contex.stream().filter(x->x.getIdUser()==id).collect(Collectors.toList());
        return outList;
    }

    public List<Reservation> getReserwationsTorRemind(){
        outList = new ArrayList<>();

        Date date = new Date();
        Calendar calendar = GregorianCalendar.getInstance();
        calendar.setTime(date);
        Integer hour = calendar.get(Calendar.HOUR_OF_DAY);
        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        String day = dateFormat.format(date);

        //outList = contex.stream().filter(x->x.getDateDay()==day && x.getHourStart()==hour.toString()).collect(Collectors.toList());

        try{
            String task = "SELECT * FROM reservations where dateDay='"+day+"' and hourStart='"+(hour+1)+"'";
            rs = st.executeQuery(task);
            
			while (rs.next()){
                Reservation tmp = new Reservation();
                tmp.setId(rs.getInt("id"));
                tmp.setDateDay(rs.getString("dateDay"));
                tmp.setHourEnd(rs.getString("hourEnd"));
                tmp.setHourStart(rs.getString("hourStart"));
                tmp.setIdObject(rs.getInt("idObject"));
                tmp.setIdUser(rs.getInt("idUser"));
                outList.add(tmp);
            }
        }catch (Exception exception){
            System.out.println("Error remindreserations: "+exception);
        }
        
        return outList;
    }
}




