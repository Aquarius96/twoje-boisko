package hello.Helpers;

import java.util.ArrayList;
import java.util.List;

public class Error_{
    public String type;
    public String value;
    public ArrayList<String> errors = new ArrayList<>();
    
    public Error_(String value_){
        type = "error";
        this.value=value_;
    }

    public Error_(String type_,String value_){
        type=type_;
        value=value_;
    }

    public Error_(List<String> errors_){
        type="error";
        this.errors= new ArrayList<>(errors_);
    }


}