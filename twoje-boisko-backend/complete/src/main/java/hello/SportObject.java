package hello;

public class SportObject{

    private Integer id;
    private String name;
    private String type;  
    private String openDays;  
    private String openHours;  
    private String city;  
    private String street;
    private String streetNumber;
    private String priceList;
    private String contact;

    public SportObject(){

    }

    public SportObject(Integer id, String name, String type, String openDays, String openHours, String city, String street, String streetNumber, String priceList, String contact){
        this.id = id;
        this.name = name;
        this.type = type;
        this.openDays = openDays;
        this.openHours = openHours;
        this.city = city;
        this.street = street;
        this.streetNumber = streetNumber;
        this.priceList = priceList;
        this.contact = contact;

    }
    public Integer getId(){
        return id;
    }
    public void setId(Integer id){
        this.id = id;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getType(){
        return type;
    }
    public void setType(String type){
        this.type = type;
    }
    public String getOpenHours(){
        return openHours;
    }
    public void setOpenHours(String openHours){
        this.openHours = openHours;
    }
    public String getOpenDays(){
        return openDays;
    }
    public void setOpenDays(String openDays){
        this.openDays = openDays;
    }
    public String getCity(){
        return city;
    }
    public void setCity(String city){
        this.city = city;
    }
    public String getStreet(){
        return street;
    }
    public void setStreet(String street){
        this.street = street;
    }
    public String getStreetNumber(){
        return streetNumber;
    }
    public void setStreetNumber(String streetNumber){
        this.streetNumber = streetNumber;
    }
    public String getPriceList(){
        return priceList;
    }
    public void setPriceList(String priceList){
        this.priceList = priceList;
    }
    public String getContact(){
        return contact;
    }
    public void setContact(String contact){
        this.contact = contact;
    }
    

}