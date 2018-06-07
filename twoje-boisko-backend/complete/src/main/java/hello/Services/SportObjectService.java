package hello.Services;

import hello.Models.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class SportObjectService{

    private Connection con;
    private Statement st;
    private ResultSet rs;

    private List<SportObject> outList;
    private List<String> outListS;
    private List<SportObject> contex;

    public SportObjectService(){
        
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
        contex = getSportObjectsFromDB();
    }

    public List<SportObject> getAllSportObjects(){
        return contex;
    }
    public List<SportObject> getSportObjectsFromDB(){
        outList = new ArrayList<>();
        try{
            String task = "SELECT * FROM sportsobjects";
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

    private Integer getfreeId(){
        Integer result=0;
        for (SportObject sportObject : contex) {
            if (sportObject.getId()!=result) break;
            result += 1;
        }
        return result;
    }

    public SportObject addSportObject(SportObject sportObject) {
        SportObject sportObject_ = new SportObject();
        sportObject.setId(getfreeId());
        try{
            String task = "INSERT INTO sportsobjects (`id`, `name`, `type`, `openDays`, `openHours`, `city`, `street`, `streetNumber`, `priceList`, `contact`) VALUES ('"+sportObject.getId()+"', '"+sportObject.getName()+"', '"+sportObject.getType()+"', '"+sportObject.getOpenDays()+"', '"+sportObject.getOpenHours()+"', '"+sportObject.getCity()+"', '"+sportObject.getStreet()+"', '"+sportObject.getStreetNumber()+"', '"+sportObject.getPriceList()+"', '"+sportObject.getContact()+"');";
            Integer tmp = st.executeUpdate(task);
            if (tmp==1) sportObject_ = sportObject;
            else {
                sportObject_.setId(-1);System.out.println("Error add_sportobjext: zle dane najprawdopodnobnmiej");
            }
            
        }catch (Exception exception){
            System.out.println("Error add_sportobject: "+exception);
            sportObject_.setId(-2);
        }
        reload();
        return sportObject_;
    }

    public SportObject updateSportObject(SportObject sportObject){
        SportObject result = new SportObject();
        try{
            String task = "UPDATE sportsobjects SET name='"+sportObject.getName()+"', type='"+sportObject.getType()+"', openDays='"+sportObject.getOpenDays()+"', openHours='"+sportObject.getOpenHours()+"', city='"+sportObject.getCity()+"', street='"+sportObject.getStreet()+"', streetNumber='"+sportObject.getStreetNumber()+"', priceList='"+sportObject.getPriceList()+"', contact='"+sportObject.getContact()+"' WHERE id = '"+sportObject.getId()+";";
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
        reload();
        return result;
    }

    public Boolean deleteSportObject(Integer id){
        if (id == 0) return false;
        Boolean result;
        try{
            String task = "DELETE FROM sportsobjects WHERE id=\""+id+"\"";
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
        reload();
        return result;
    }

    public SportObject findSportObjectById(Integer id){
        outList = contex.stream().filter(x->x.getId()==id).collect(Collectors.toList());
        if (!outList.isEmpty()) return outList.get(0);
        else return new SportObject(-1);
    }

    public List<SportObject> findSportObjectsByCity(String city){
        outList = contex.stream().filter(x->x.getCity().equals(city)).collect(Collectors.toList());
        return outList;
    }

    public List<String> getAllTypes(){
        outListS = new ArrayList<>();
        try{
            String task = "SELECT DISTINCT type FROM sportsobjects";
            rs = st.executeQuery(task);

            while (rs.next()){
                outListS.add(rs.getString("type"));
            }
        }catch (Exception exception){
            System.out.println("Error all_types: "+exception);
        }
        return outListS;
    }

}