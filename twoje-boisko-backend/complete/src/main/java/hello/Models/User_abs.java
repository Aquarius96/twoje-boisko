package hello.Models;

public class User_abs {

    private String login;
    private String password;

    public User_abs(){

    }
    public User_abs(String login, String password) {
        this.login = login;
        this.password = password;
    }

    
    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }

    public void  setLogin(String login) {
        this.login = login;
    }

    public void setPassword(String password) {
        this.password= password;
    }
}
