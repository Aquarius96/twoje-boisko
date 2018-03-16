package hello;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;



public class DBconnector{

    private Connection con;
    private Statement st;
    private ResultSet rs;

    private List<User> topicsList = new ArrayList<>();

    public DBconnector(){
        
        try{
            Class.forName("com.mysql.jdbc.Driver");

            con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/zeto","root","");
            st = con.createStatement();

        }catch(Exception exception){
            System.out.println("Error: "+exception);
        }
    }

    public List<User> getAllUsers(){
        
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
                topicsList.add(tmp);
            }
        }catch (Exception exception){
            //!throw exeption
        }
		return topicsList;
    }

}