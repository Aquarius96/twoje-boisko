package hello.Services;

import hello.Helpers.BCrypt;
import hello.Models.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


public class newNewsService{
    private Connection con;
    private Statement st;
    private ResultSet rs;
    private List<News> outList ;
    private List<News> contex;

    public newNewsService(){
        try{
            Class.forName("com.mysql.jdbc.Driver");

            con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/zeto?useUnicode=yes&characterEncoding=UTF-8","root","");
            st = con.createStatement();

        }catch(Exception exception){
            System.out.println("Error connection: "+exception);
        }
        reload();
    }

    public void reload(){
        contex = getNewsFromDB();
    }

    private List<News> getNewsFromDB(){
        outList = new ArrayList<>();
        try{
            String task = "SELECT * FROM news";
            rs = st.executeQuery(task);
			while (rs.next()){
                News tmp = new News();
                tmp.setId(rs.getInt("id"));
                tmp.setDate(rs.getString("date"));
                tmp.setHeader(rs.getString("header"));
                tmp.setText(rs.getString("text"));
                outList.add(tmp);
            }
        }catch (Exception exception){
            System.out.println("Error all_news: "+exception);
        }
		return outList;
    }

    private Integer getfreeId(){
        Integer result=0;
        for (News news : contex) {
            if (news.getId()!=result) break;
            result += 1;
        }
        return result;
    }

    public News addNews(News news) {
        News news_ = new News();
        news.setId(getfreeId());
        try{
            String task = "INSERT INTO news (`id`, `header`, `text`, `date`) VALUES ('"+news.getId()+"', '"+news.getHeader()+"', '"+news.getText()+"', '"+news.getDate()+"');";
            Integer tmp = st.executeUpdate(task);
            if (tmp==1) news_ = news;
            else {
                news_.setId(-1);System.out.println("Error add_news: zle dane najprawdopodnobnmiej");
            }
            
        }catch (Exception exception){
            System.out.println("Error add_news(polacznei): "+exception);
            news_.setId(-2);
        }
        reload();
        return news_;
    }

    public News updateNews(News news){
        News result = new News();
        try{
            String task = "UPDATE news SET header='"+news.getHeader()+"', text='"+news.getText()+"', date='"+news.getDate()+"' WHERE id = '"+news.getId()+"';";
            Integer tmp = st.executeUpdate(task);
            if (tmp == 1) {
                result.setId(news.getId());
                result.setDate(news.getDate());
                result.setHeader(news.getHeader());
                result.setText(news.getText());

            }
            else {
                System.out.println("Error update_news: zle dane najprawdopodnobnmiej");
                result.setId(-1);
            }
                
        }catch (Exception exception){
            System.out.println("Error update_news (polaczenie): "+exception);
            result.setId(-2);
        }
        reload();
        return result;
    }

    public Boolean deleteNews(Integer id){
        
        Boolean result;
        try{
            String task = "DELETE FROM news WHERE id=\""+id+"\"";
            Integer tmp = st.executeUpdate(task);
            if (tmp==1) result = true;
            else {
                System.out.println("Error delete_News: zle id");
                result = false;
            }
        
        }catch(Exception exception){
            System.out.println("Error delete_News(polaczenie): "+exception);
            result = false;
        }
        reload();
        return result;
    }

    public List<News> getAllNews(){
        outList = new ArrayList<>();
        try{
            String task = "SELECT * FROM news order by date desc";
            rs = st.executeQuery(task);
            
			while (rs.next()){
                News tmp = new News();
                tmp.setId(rs.getInt("id"));
                tmp.setDate(rs.getString("date"));
                tmp.setHeader(rs.getString("header"));
                tmp.setText(rs.getString("text"));
                outList.add(tmp);
            }
        }catch (Exception exception){
            System.out.println("Error all_news: "+exception);
        }
		return outList;
    }

}