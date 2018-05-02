package hello.Helpers;

public class Result_{
    public String type;
    public String value;
    
    public Result_(String value_){
        type = "error";
        this.value=value_;
    }

    public Result_(String type_,String value_){
        type=type_;
        value=value_;
    }


}