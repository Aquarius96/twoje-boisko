package hello;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;


public class ReservationsService{
    private Connection con;
    private Statement st;
    private ResultSet rs;

    private List<Reservation> outList ;


    public ReservationsService(){
        
        try{
            Class.forName("com.mysql.jdbc.Driver");

            con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/zeto","root","");
            st = con.createStatement();

        }catch(Exception exception){
            System.out.println("Error connection: "+exception);
        }
    }

    public Reservation addReservation(Reservation reservation) {
        Reservation reservation_ = new Reservation();
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
        return result;
    }

    public Reservation findReservation(Integer id){
        Reservation result = new Reservation();
        try{
            String task = "SELECT * FROM reservations WHERE id=\""+id+"\"";
            rs = st.executeQuery(task);

            if (rs.next()){
                result.setId(rs.getInt("id"));
                result.setHourEnd(rs.getString("hourEnd"));
                result.setDateDay(rs.getString("dateDay"));
                result.setHourStart(rs.getString("hourStart"));
                result.setIdObject(rs.getInt("idObject"));
                result.setIdUser(rs.getInt("idUser"));
            }
            
        }catch (Exception exception){
            System.out.println("Error find_Reservation(id): "+exception);
        }
        return result;
    }

    public List<Reservation> findReservationsObject(Integer id){
        outList = new ArrayList<>();
        try{
            String task = "SELECT * FROM reservations WHERE idObject=\""+id+"\"";
            rs = st.executeQuery(task);

            while (rs.next()){
                Reservation tmp = new Reservation();
                tmp.setId(rs.getInt("id"));
                tmp.setHourEnd(rs.getString("hourEnd"));
                tmp.setDateDay(rs.getString("dateDay"));
                tmp.setHourStart(rs.getString("hourStart"));
                tmp.setIdObject(rs.getInt("idObject"));
                tmp.setIdUser(rs.getInt("idUser"));
                outList.add(tmp);
            }
            
        }catch (Exception exception){
            System.out.println("Error find_Reservation(object): "+exception);
        }
        return outList;
    }

    public List<Reservation> findReservationsUser(Integer id){
        outList = new ArrayList<>();
        try{
            String task = "SELECT * FROM reservations WHERE idUser=\""+id+"\"";
            rs = st.executeQuery(task);

            while (rs.next()){
                Reservation tmp = new Reservation();
                tmp.setId(rs.getInt("id"));
                tmp.setHourEnd(rs.getString("hourEnd"));
                tmp.setDateDay(rs.getString("dateDay"));
                tmp.setHourStart(rs.getString("hourStart"));
                tmp.setIdObject(rs.getInt("idObject"));
                tmp.setIdUser(rs.getInt("idUser"));
                outList.add(tmp);
            }
            
        }catch (Exception exception){
            System.out.println("Error find_Reservation(user): "+exception);
        }
        return outList;
    }

    public Integer getfreeId(){
        Integer result;
        try{
            String task = "SELECT * FROM reservations";
            rs = st.executeQuery(task);
            result = 0;
            while (rs.next()){
                if (rs.getInt("id")!=result) break;
                result +=1;
            }
        }catch(Exception exception){
            System.out.println("Error free_id: "+exception);
            result = -1;
        }
        return result;
        
    }
    
    public List<Reservation> getAllReservations(){
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
}




