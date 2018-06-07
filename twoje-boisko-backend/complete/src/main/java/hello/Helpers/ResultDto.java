package hello.Helpers;

import java.util.ArrayList;


public class ResultDto<T>{

    private ArrayList<String> errors;
    private T succesed;

    public ResultDto(){
        errors = new ArrayList<>();
    }

    public Boolean isError(){
        if (errors.size()>0) return true;
        return false;
    }

    public void addError(String value){
        errors.add(value);
    }

    public void setSuccesec(T obiect){
        succesed = obiect;
    }

    public void setErrors(ArrayList<String> errors_){
        this.errors = errors_;
    }

    public T getSUccesedResult(){
        return succesed;
    }

    public ArrayList<String> getErrors(){
        return errors;
    }

}