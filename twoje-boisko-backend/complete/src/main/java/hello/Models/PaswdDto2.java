package hello.Models;

public class PaswdDto2 {

    private Integer id;
    private String paswd;

    public PaswdDto2(){

    }
    public PaswdDto2(Integer id_, String paswd_) {
        this.id = id_;
        this.paswd = paswd_;
    }

    
    public String getPaswd() {
        return paswd;
    }
    public Integer getId() {
        return id;
    }

}
