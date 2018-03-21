package hello;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class SportObjectService{

    private Connection con;
    private Statement st;
    private ResultSet rs;

    private List<SportObject> outList;

    public SportObjectService(){
        
        try{
            Class.forName("com.mysql.jdbc.Driver");

            con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/zeto","root","");
            st = con.createStatement();

        }catch(Exception exception){
            System.out.println("Error connection: "+exception);
        }
    }

    public SportObject updateSportObject(SportObject sportObject){
        SportObject result = new SportObject();
        try{
            String task = "UPDATE sportobjects  SET name='"+sportObject.getName()+"', type='"+sportObject.getType()+"', openDays='"+sportObject.getOpenDays()+"', openHours='"+sportObject.getOpenHours()+"', city='"+sportObject.getCity()+"', street='"+sportObject.getStreet()+"', streetNumber='"+sportObject.getStreetNumber()+"', priceList='"+sportObject.getPriceList()+"', contact='"+sportObject.getContact()+"' WHERE id = '"+sportObject.getId()+";";
            Integer tmp = st.executeUpdate(task);
            if (tmp == 1) {
                result.setId(sportObject.getId());
                result.setName(sportObject.getName());
                result.setType(sportObject.getType());
                result.setOpenDays(sportObject.getOpenDays());
                result.setOpenHours(sportObject.getOpenHours());
                result.setCity(sportObject.getCity());
                result.setStreet(sportObject.getStreet());
                result.setStreetNumber(sportObject.getStreetNumber());
                result.setPriceList(sportObject.getPriceList());
                result.setContact(sportObject.getContact());
            }
            else {
                System.out.println("Error update: zle dane najprawdopodnobnmiej");
                result.setId(-1);
            }
                
        }catch (Exception exception){
            System.out.println("Error update: "+exception);
            result.setId(-1);
        }
        
        return result;
    }

    public SportObject addSportObject(SportObject sportObject) {
        SportObject sportObject_ = new SportObject();
        try{
            String task = "INSERT INTO sportobjects (`id`, `name`, `type`, `openDays`, `openDays`, `openHours`, `city`, `street`, `streetNumber`, `priceList`, `contact`) VALUES ('"+sportObject.getId()+"', '"+sportObject.getName()+"', '"+sportObject.getType()+"', '"+sportObject.getOpenDays()+"', '"+sportObject.getOpenHours()+"', '"+sportObject.getCity()+"', '"+sportObject.getStreet()+"', '"+sportObject.getStreetNumber()+"', '"+sportObject.getPriceList()+"', '"+sportObject.getContact()+"');";
            Integer tmp = st.executeUpdate(task);
            if (tmp==1) sportObject_ = sportObject;
            else {
                sportObject_.setId(-1);System.out.println("Error add_sportobjext: zle dane najprawdopodnobnmiej");
            }
            
        }catch (Exception exception){
            System.out.println("Error add_sportobject: "+exception);
            sportObject_.setId(-1);
        }
        return sportObject_;
    }

    public Boolean deleteSportObject(Integer id){
        if (id == 0) return false;
        Boolean result;
        try{
            String task = "DELETE FROM sportobjects WHERE id=\""+id+"\"";
            Integer tmp = st.executeUpdate(task);
            if (tmp==1) result = true;
            else {
                System.out.println("Error delete_sportobject: zle id");
                result = false;
            }
        
        }catch(Exception exception){
            System.out.println("Error delete_sportobject: "+exception);
            result = false;
        }
        return result;
    }

    public SportObject findSportObject(Integer id){
        SportObject result = new SportObject();
        try{
            String task = "SELECT * FROM sportobjects WHERE id=\""+id+"\"";
            rs = st.executeQuery(task);

            if (rs.next()){
                result.setId(rs.getInt("id"));
                result.setName(rs.getString("name"));
                result.setType(rs.getString("type"));
                result.setOpenDays(rs.getString("openDays"));
                result.setOpenHours(rs.getString("openHours"));
                result.setCity(rs.getString("city"));
                result.setStreet(rs.getString("street"));
                result.setStreetNumber(rs.getString("streetNumber"));
                result.setPriceList(rs.getString("priceList"));
                result.setContact(rs.getString("contact"));
            }
            
        }catch (Exception exception){
            System.out.println("Error find_sportobjects(id): "+exception);
        }
        return result;
    }

    public Integer getfreeId(){
        Integer result;
        try{
            String task = "SELECT * FROM sportobjects";
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

    public List<SportObject> getAllSportObjects(){
        outList = new ArrayList<>();
        try{
            String task = "SELECT * FROM sportobjects";
            rs = st.executeQuery(task);
            
			while (rs.next()){
                SportObject tmp = new SportObject();
                tmp.setId(rs.getInt("id"));
                tmp.setName(rs.getString("name"));
                tmp.setType(rs.getString("type"));
                tmp.setOpenDays(rs.getString("openDays"));
                tmp.setOpenHours(rs.getString("openHours"));
                tmp.setCity(rs.getString("city"));
                tmp.setStreet(rs.getString("street"));
                tmp.setStreetNumber(rs.getString("streetNumber"));
                tmp.setPriceList(rs.getString("priceList"));
                tmp.setContact(rs.getString("contact"));
                outList.add(tmp);
            }
        }catch (Exception exception){
            System.out.println("Error all_sportobjects: "+exception);
        }
		return outList;
    }
}