package hello.Services;

import hello.Models.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;



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
            System.out.println("Error connection: "+exception);
        }
    }

    public User updateUser(User user){
        User result = new User();
        try{
            String task = "UPDATE users  SET username='"+user.getUsername()+"', password='"+user.getPassword()+"', firstname='"+user.getFirstname()+"', lastname='"+user.getLastname()+"', email='"+user.getEmail()+"', phone='"+user.getPhone()+"', confirmationCode='"+user.getCode()+", isConfirmed='"+user.getConfirm().compareTo(false)+"' WHERE id = '"+user.getId()+"';";
            Integer tmp = st.executeUpdate(task);
            if (tmp == 1) {
                result.setId(user.getId());
                result.setUsername(user.getUsername());
                result.setPassword(user.getPassword());
                result.setFirstname(user.getFirstname());
                result.setLastname(user.getLastname());
                result.setEmail(user.getEmail());
                result.setPhone(user.getPhone());
                result.setCode(user.getCode());
                result.setConfirm(user.getConfirm());
            }
            else {
                System.out.println("Error update user: zle dane najprawdopodnobnmiej");
                result.setId(-1);
            }
                
        }catch (Exception exception){
            System.out.println("Error update user (polaczenie): "+exception);
            result.setId(-2);
        }
        
        return result;
    }
    
    public User addUser(User user) {
        User user_ = new User();
        try{
            String task = "INSERT INTO users (`id`, `username`, `password`, `firstname`, `lastname`, `email`, `phone`, `confirmationCode`, `isConfirmed`) VALUES ('"+user.getId()+"', '"+user.getUsername()+"', '"+user.getPassword()+"', '"+user.getFirstname()+"', '"+user.getLastname()+"', '"+user.getEmail()+"', '"+user.getPhone()+"', '"+user.getCode()+"', '"+user.getConfirm().compareTo(false)+"');";
            Integer tmp = st.executeUpdate(task);
            if (tmp==1) user_ = user;
            else {
                user_.setId(-1);System.out.println("Error add_user: zle dane najprawdopodnobnmiej");
            }
            
        }catch (Exception exception){
            System.out.println("Error add_user(polaczenie): "+exception);
            user_.setId(-2);
        }
        return user_;
    }

    
    public Boolean deleteUser(Integer id){
        if (id == 0) return false;
        Boolean result;
        try{
            String task = "DELETE FROM users WHERE id=\""+id+"\"";
            Integer tmp = st.executeUpdate(task);
            if (tmp==1) result = true;
            else {
                System.out.println("Error delete_user: zle id");
                result = false;
            }
        
        }catch(Exception exception){
            System.out.println("Error delete_user(polaczenie): "+exception);
            result = false;
        }
        return result;
    }

    public Integer checkUser(User_abs user){
        Boolean login_exist = false, password_correct = false;
        Integer id = null;
        
        try{
            String task = "SELECT * FROM users WHERE username=\""+user.getLogin()+"\"";
            rs = st.executeQuery(task);

            if (rs.next()){
                
                login_exist = true;

                if (user.getPassword().equals(rs.getString("password")) ){
                    password_correct = true;
                    id = rs.getInt("id");
                }
            }
            
        }catch (Exception exception){
            System.out.println("Error check_user(login): "+exception);
        }
        
        if (!login_exist) return -1;
        else if (!password_correct) return -2;
        
        return id;
    }

    public Boolean checkUpdater(User user){
        try{
            String task = "SELECT * FROM users WHERE email='"+user.getEmail()+"' AND id!='"+user.getId()+"';";
            rs = st.executeQuery(task);

            if (rs.next()){
                return false;
            }
            return true;

            
        }catch (Exception exception){
            System.out.println("Error check_user(updater): "+exception);
            return false;
        }
        
    }

    public Integer checkUser(User user){
        Integer user_name = 0, email = 0;
        try{
            String task = "SELECT * FROM users WHERE username='"+user.getUsername()+"'";
            rs = st.executeQuery(task);

            if (rs.next()){
                user_name = 1;
            }
            task = "SELECT * FROM users WHERE email='"+user.getEmail()+"'";
            rs = st.executeQuery(task);

            if (rs.next()){
                email = 2;
            }

            return user_name + email;

            
        }catch (Exception exception){
            System.out.println("Error check_user(register): "+exception);
            return -1;
        }
        
    }

    public User findUser(Integer id){
        User result = new User(-1);
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
                result.setCode(rs.getString("confirmationCode"));
                result.setConfirm(rs.getBoolean("isConfirmed"));
            }
            
        }catch (Exception exception){
            System.out.println("Error find_user(id): "+exception);
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
            System.out.println("Error free_id: "+exception);
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
                tmp.setCode(rs.getString("confirmationCode"));
                tmp.setConfirm(rs.getBoolean("isConfirmed"));
                outList.add(tmp);
            }
        }catch (Exception exception){
            System.out.println("Error all_users: "+exception);
        }
		return outList;
    }

}