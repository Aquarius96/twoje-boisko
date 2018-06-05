package hello.Helpers;

public class Error_{
    public String type;
    public String value;
    
    public Error_(String value_){
        type = "error";
        this.value=value_;
    }

    public Error_(String type_,String value_){
        type=type_;
        value=value_;
    }


}