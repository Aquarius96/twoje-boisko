package hello;

public class News{

    private Integer id;
    private String header;
    private String text;
    private String date;

    public News(){

    }
    public News(Integer id,String header,String text,String date){
        this.id = id;
        this.header=header;
        this.text=text;
        this.date=date;
    }

    public Integer getId(){
        return id;
    }
    public void setId(Integer id){
        this.id=id;
    }

    public String getHeader(){
        return header;
    }
    public void setHeader(String header){
        this.header=header;
    }

    public String getText(){
        return text;
    }
    public void setText(String text){
        this.text = text;
    }

    public String getDate(){
        return date;
    }
    public void setDate(String date){
        this.date=date;
    }
}