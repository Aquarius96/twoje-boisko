package hello;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;


import org.json.JSONObject;




public class UserService{

    private Connection con;
    private Statement st;
    private ResultSet rs;

    private List<User> outList ;

    public UserService(){
        
        try{
            Class.forName("com.mysql.jdbc.Driver");

            con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/zeto","root","");
            st = con.createStatement();

        }catch(Exception exception){
            System.out.println("Error: "+exception);
        }
    }

    public Boolean updateUser(Integer id){
        Boolean result = false;
        // tutaj powinno byc sqlowskie zapytanie z st.executeUpdate o UPDATE ale to juz pozniej 
        return result;
    }
    //! juz dodaje tlyko cos z tym jsonem trzeba zrobic  jak doda to niech zwroci usera jak nie to error
    public JSONObject addUser(User user) {
        JSONObject userJSON = new JSONObject();
        try{
            String task = "INSERT INTO users (`id`, `username`, `password`, `firstname`, `lastname`, `email`, `phone`) VALUES ('"+user.getId()+"', '"+user.getUsername()+"', '"+user.getPassword()+"', '"+user.getFirstname()+"', '"+user.getLastname()+"', '"+user.getEmail()+"', '"+user.getPhone()+"');";
            Integer tmp = st.executeUpdate(task);
            //userJSON.put("username", user.getFirstname());
            userJSON.put("user", user);
        }catch (Exception exception){
            System.out.println("Error: "+exception);
        }
        return userJSON;
    }

    public Boolean deleteUser(Integer id){
        Boolean result;
        try{
            System.out.println("id: "+id);
            String task = "DELETE FROM users WHERE id=\""+id+"\"";
            Integer count = st.executeUpdate(task);
            result = true;
        
        }catch(Exception exception){
            System.out.println("Error: "+exception);
            result = false;
        }
        return result;
    }
    public Integer checkUser(User_abs user){
        Boolean login_exist = false, password_correct = false;
        
        try{
            String task = "SELECT * FROM users WHERE username=\""+user.getLogin()+"\"";
            rs = st.executeQuery(task);

            if (rs.next()){
                
                login_exist = true;

                if (user.getPassword().equals(rs.getString("password")) ){
                    password_correct = true;
                }
            }
            
        }catch (Exception exception){
            System.out.println("Error: "+exception);
        }
        
        if (!login_exist) return 1;
        else if (!password_correct) return 2;
        
        return 0;
    }
    public Integer checkUser(User user){
        Boolean login_exist = false, password_correct = false;
        
        try{
            String task = "SELECT * FROM users WHERE username=\""+user.getUsername()+"\"";
            rs = st.executeQuery(task);

            if (rs.next()){
                
                login_exist = true;

                if (user.getPassword().equals(rs.getString("password")) ){
                    password_correct = true;
                }
            }
            
        }catch (Exception exception){
            System.out.println("Error: "+exception);
        }
        
        if (!login_exist) return 1;
        else if (!password_correct) return 2;
        
        return 0;
    }

    public User findUser(Integer id){
        User result = new User();
        try{
            String task = "SELECT * FROM users WHERE id=\""+id+"\"";
            rs = st.executeQuery(task);

            if (rs.next()){
                result.setId(rs.getInt("id"));
                result.setUsername(rs.getString("username"));
                result.setPassword(rs.getString("password"));
                result.setFirstname(rs.getString("firstname"));
                result.setLastname(rs.getString("lastname"));
                result.setEmail(rs.getString("email"));
                result.setPhone(rs.getString("phone"));
            }
            
        }catch (Exception exception){
            System.out.println("Error: "+exception);
        }
        return result;
    }
    public User findUser(String username){
        User result = new User();
        try{
            String task = "SELECT * FROM users WHERE username=\""+username+"\"";
            rs = st.executeQuery(task);

            if (rs.next()){
                result.setId(rs.getInt("id"));
                result.setUsername(rs.getString("username"));
                result.setPassword(rs.getString("password"));
                result.setFirstname(rs.getString("firstname"));
                result.setLastname(rs.getString("lastname"));
                result.setEmail(rs.getString("email"));
                result.setPhone(rs.getString("phone"));
            }
            
        }catch (Exception exception){
            System.out.println("Error: "+exception);
        }
        return result;
    }
    public Integer getfreeId(){
        Integer result;
        try{
            String task = "SELECT * FROM users";
            rs = st.executeQuery(task);
            result = 0;
            while (rs.next()){
            if (rs.getInt("id")!=result) break;
            result +=1;
        }
        }catch(Exception exception){
            result = -1;
        }
        return result;
        
    }
    public List<User> getAllUsers(){
        outList = new ArrayList<>();
        try{
            String task = "SELECT * FROM users";
            rs = st.executeQuery(task);
            
			while (rs.next()){
                User tmp = new User();
                tmp.setId(rs.getInt("id"));
                tmp.setUsername(rs.getString("username"));
                tmp.setPassword(rs.getString("password"));
                tmp.setFirstname(rs.getString("firstname"));
                tmp.setLastname(rs.getString("lastname"));
                tmp.setEmail(rs.getString("email"));
                tmp.setPhone(rs.getString("phone"));
                outList.add(tmp);
            }
        }catch (Exception exception){
            System.out.println("Error: "+exception);
        }
		return outList;
    }

}