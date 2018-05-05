package hello.Models;

public class User {

  private Integer id;
  private String username;
  private String password;  
  private String firstname;  
  private String lastname;  
  private String email;  
  private String phone;
  private String confirmationCode;
  private Boolean isConfirmed;
  private Boolean remindMe;

  public User(){

  }
  public User(Integer id){ //* errouser 
    this.id = id;
  }
  public User(Integer id, String username, String password, String firstname, String lastname, String email, String phone,String code,Boolean isConfirmed_,Boolean remindMe_){
    this.id = id;
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.confirmationCode = code;
    this.isConfirmed = isConfirmed_;
    this.remindMe = remindMe_;
  }

  //? po cos tam moze kiedys sie przyda 

  public User(Integer id, String username, String password){
    this.id = id;
    this.username = username;
    this.password = password;
  }

  public Boolean getConfirm(){
    return isConfirmed;
  }

  public void setConfirm(Boolean confirm){
    this.isConfirmed = confirm;
  }
  public Boolean getRemind(){
    return remindMe;
  }

  public void setRemind(Boolean remind){
    this.remindMe = remind;
  }
  
  public String getCode(){
    return confirmationCode;
  }
  
  public void setCode(String code){
    this.confirmationCode = code;
  }

  public Integer getId() {  
  return id;  
  }
    
  public void setId(Integer id) {  
  this.id = id;  
  }

  public String getUsername() {  
  return username;  
  }
  
  public void setUsername(String username) {  
  this.username = username;  
  }
  
  public String getPassword() {  
  return password;  
  }
  
  public void setPassword(String password) {  
  this.password = password;  
  }
  
  public String getFirstname() {  
  return firstname;  
  }
  
  public void setFirstname(String firstname) {  
  this.firstname = firstname;  
  }
  
  public String getLastname() {  
  return lastname;  
  }
  
  public void setLastname(String lastname) {  
  this.lastname = lastname;  
  }
  
  public String getEmail() {  
  return email;  
  }
  
  public void setEmail(String email) {  
  this.email = email;  
  }

  public String getPhone() {  
  return phone;  
  }
    
  public void setPhone(String phone) {  
  this.phone = phone;  
  }
    
  }