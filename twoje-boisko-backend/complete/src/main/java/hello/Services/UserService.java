package hello.Services;

import hello.Helpers.BCrypt;
import hello.Models.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
@Service
public class UserService{

    private Connection con;
    private Statement st;
    private ResultSet rs;
    private List<User> outList ;
    private List<User> contex;

    public UserService(){
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
        contex = getUserFromDB();
    }

    public String getConCode(Integer id){
        User user = findUserById(id);
        return user.getCode();
    }

    public Boolean changePaswd(Integer id,String oldPaswd, String newPaswd){
        User user = findUserById(id);
        if (BCrypt.checkpw(oldPaswd, user.getPassword())){
            user.setPassword(BCrypt.hashpw(newPaswd, BCrypt.gensalt()));
            if (updateUser(user).getId()>=0) return true;
            else return false;
        }
        else return false;
    }

    public Boolean changePaswdafterForgot(Integer id, String newPaswd){
        User user = findUserById(id);
        user.setPassword(BCrypt.hashpw(newPaswd, BCrypt.gensalt()));
        user.setCode(null);
        User tmp = updateUser(user);
        if (tmp.getId()>=0) return true;
        else return false;
    }

    public Boolean checkPaswd(Integer id, String paswd){
        User user = findUserById(id);
        return BCrypt.checkpw(paswd, user.getPassword());
    }

    public User updateUser(User user){
        User result = new User();
        try{
            String task = "UPDATE users  SET username='"+user.getUsername()+"', password='"+findUserById(user.getId()).getPassword()+"', firstname='"+user.getFirstname()+"', lastname='"+user.getLastname()+"', email='"+user.getEmail()+"', phone='"+user.getPhone()+"', confirmationCode='"+user.getCode()+"', isConfirmed='"+user.getConfirm().compareTo(false)+"', remindMe='"+user.getRemind().compareTo(false)+"' WHERE id = '"+user.getId()+"';";
            Integer execute = st.executeUpdate(task);
            if (execute == 1) {
                result.setId(user.getId());
                result.setUsername(user.getUsername());
                result.setPassword(user.getPassword());
                result.setFirstname(user.getFirstname());
                result.setLastname(user.getLastname());
                result.setEmail(user.getEmail());
                result.setPhone(user.getPhone());
                result.setCode(user.getCode());
                result.setConfirm(user.getConfirm());
                result.setRemind(user.getRemind());
            }
            else {
                System.out.println("Error update user: zle dane najprawdopodnobnmiej");
                result.setId(-1);
            }
        }catch (Exception exception){
            System.out.println("Error update user (polaczenie): "+exception);
            result.setId(-2);
        }
        reload();
        return result;
    }
    
    public User addUser(User user) {
        user.setId(getfreeId());
        user.setConfirm(false);
        UUID uuid = UUID.randomUUID();
        user.setCode(uuid.toString());
        String pw_hash = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()); 
        user.setPassword(pw_hash);
        user.setRemind(true);
        User user_ = new User();
        try{
            String task = "INSERT INTO users (`id`, `username`, `password`, `firstname`, `lastname`, `email`, `phone`, `confirmationCode`, `isConfirmed`, `remindMe` ) VALUES ('"+user.getId()+"', '"+user.getUsername()+"', '"+user.getPassword()+"', '"+user.getFirstname()+"', '"+user.getLastname()+"', '"+user.getEmail()+"', '"+user.getPhone()+"', '"+user.getCode()+"', '"+user.getConfirm().compareTo(false)+"', '"+user.getRemind().compareTo(false)+"');";
            Integer tmp = st.executeUpdate(task);
            if (tmp==1){
                user_ = user;
            }                
            else {
                user_.setId(-1);System.out.println("Error add_user: zle dane najprawdopodnobnmiej");
            }
        }catch (Exception exception){
            System.out.println("Error add_user(polaczenie): "+exception);
            user_.setId(-2);
        }
        reload();
        return user_;
    }

    public Boolean deleteUser(Integer id){
        if (id == 0) return false;
        Boolean result;
        try{
            String task = "DELETE FROM users WHERE id=\""+id+"\"";
            Integer tmp = st.executeUpdate(task);
            if (tmp==1){
                result = true;
            } 
            else {
                System.out.println("Error delete_user: zle id");
                result = false;
            }
        }catch(Exception exception){
            System.out.println("Error delete_user(polaczenie): "+exception);
            result = false;
        }
        reload();
        return result;
    }

    public Integer tryToLoggIn(User_abs user){
        Boolean login_exist = false, password_correct = false;
        Integer id = null;
        outList = contex.stream().filter(x->x.getUsername().equals(user.getLogin())).collect(Collectors.toList()); 
        
        if (!outList.isEmpty()){
            
            login_exist = true;
            if (BCrypt.checkpw(user.getPassword(), outList.get(0).getPassword()) ){
                password_correct = true;
                id = outList.get(0).getId();
            }
        }
        if (!login_exist) return -1;
        else if (!password_correct) return -2;
        return id;
    }

    public Integer checkUpdater(User user){
        outList = contex.stream().filter(x->x.getEmail().equals(user.getEmail()) &&  x.getId()!=user.getId()).collect(Collectors.toList()); 
        if (outList.isEmpty()) return 1;
        else return -1;
    }

    public Integer checkUser(User user){
        Integer user_name = 0, email = 0;
        outList = contex.stream().filter(x->x.getUsername().equals(user.getUsername())).collect(Collectors.toList()); 
        if (!outList.isEmpty()) user_name = 1;
        outList = contex.stream().filter(x->x.getEmail().equals(user.getEmail())).collect(Collectors.toList()); 
        if (!outList.isEmpty()) email = 2;
        return user_name + email;
    }

    public User findUserById(Integer id){
        outList = contex.stream().filter(x->x.getId()==id).collect(Collectors.toList());
        if (!outList.isEmpty()) return outList.get(0);
        else return new User(-1);
    }

    public User findUserByEmail(String email){
        outList = contex.stream().filter(x->x.getEmail().equals(email)).collect(Collectors.toList());
        if (!outList.isEmpty()) return outList.get(0);
        else return new User(-1);
    }

    private Integer getfreeId(){
        Integer result=0;
        for (User user : contex) {
            if (user.getId()!=result) break;
            result += 1;
        }
        return result;
    }

    public List<User> getAllUsers(){
        return contex;
    }
    
    private List<User> getUserFromDB(){
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
                tmp.setRemind(rs.getBoolean("remindMe"));
                outList.add(tmp);
            }
        }catch (Exception exception){
            System.out.println("Error all_users: "+exception);
        }
		return outList;
    }

    public void clearConCode(){
        try{
            String task = "SELECT * FROM users WHERE confirmationCode!=\"null\" AND isConfirmed=1";
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
                tmp.setCode(null);
                tmp.setConfirm(rs.getBoolean("isConfirmed"));
                tmp.setRemind(rs.getBoolean("remindMe"));
                updateUser(tmp);
            }
        }catch (Exception exception){
            System.out.println("Error cler cashe: "+exception);
        }
        reload();
    }
}