package hello.test;

public class Result{
    public String type;
    public String value;
    
    public Result(String value_){
        type = "error";
        this.value=value_;
    }

    public Result(String type_,String value_){
        type=type_;
        value=value_;
    }


}