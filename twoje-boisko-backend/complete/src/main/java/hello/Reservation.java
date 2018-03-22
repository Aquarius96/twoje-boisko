package hello;

public class Reservation{

    private Integer id;
    private String dateDay;
    private String hourStart;
    private String hourEnd;
    private Integer idObject;
    private Integer idUser;

    public Reservation(){

    }

    public Reservation(Integer id, String dDay, String hStart, String hEnd, Integer idObject, Integer idUser){
        this.id = id;
        this.dateDay=dDay;
        this.hourStart=hStart;
        this.hourEnd=hEnd;
        this.idObject=idObject;
        this.idUser=idUser;
    }
    public Integer getId() {  
    return id;  
    }
          
    public void setId(Integer id) {  
    this.id = id;  
    }

    public String getDateDay(){
    return dateDay;
    }
    public void setDateDay(String dDay){
        this.dateDay=dDay;
    }

    public String getHourStart(){
        return hourStart;
    }
    public void setHourStart(String hStart){
        this.hourStart = hStart;
    }

    public String getHourEnd(){
        return hourEnd;
    }
    public void setHourEnd(String hEnd){
        this.hourEnd = hEnd;
    }

    public Integer getIdObject(){
        return idObject;
    }
    public void setIdObject(Integer id){
        this.idObject = id;
    }

    public Integer getIdUser(){
        return idUser;
    }
    public void setIdUser(Integer id){
        this.idUser = id;
    }

}