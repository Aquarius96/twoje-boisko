package hello.Models;

public class PaswdDto {

    private Integer id;
    private String oldpaswd;
    private String newpaswd;

    public PaswdDto(){

    }
    public PaswdDto(Integer id_, String oldpaswd_, String newpaswd_) {
        this.id = id_;
        this.oldpaswd = oldpaswd_;
        this.newpaswd = newpaswd_;
    }

    
    public String getOldpaswd() {
        return oldpaswd;
    }
    public Integer getId() {
        return id;
    }

    public String getNewpaswd() {
        return newpaswd;
    }


}
