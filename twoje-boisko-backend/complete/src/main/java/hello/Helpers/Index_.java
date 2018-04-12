package hello.Helpers;

public class Index_{
    private Integer id;
    private String value;

    public Index_ (){

    }
    
    public Index_ (Integer id_, String vlue_){
        this.value = vlue_;
        this.id=id_;
    }
    public Index_ (String vlue_){
        this.value = vlue_;
    }
    public Index_ (Integer id_){
        this.id=id_;
    }

    public void setValue(String v){
        this.value = v;
    }
    public String getValue(){
        return value;
    }
    public void setId(Integer id_){
        this.id = id_;
    }
    public Integer getId(){
        return this.id;
    }

}