package hello.Controllers;
import java.util.List;
import org.springframework.web.bind.annotation.*;

import hello.Models.*;
import hello.Services.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value="/news")
public class NewsController{

    private NewsService con;
    public NewsController(){
        con = new NewsService(); 
    }
    

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/add", method = RequestMethod.POST)
    @ResponseBody
    public News addNews(@RequestBody News news) {
        news.setId(con.getfreeId());
        return con.addNews(news);  
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    @ResponseBody
    public String deleteNews(@RequestParam(value="id", required = true) String id) {
        Boolean tmp = con.deleteNews(Integer.parseInt(id));
        if ( tmp ) return "usunieto";
        else return "blad przy usuwaniu";

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/allNews")
    public List<News> getNews(){
        return con.getAllNews();
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value ="/update", method = RequestMethod.POST)
    @ResponseBody
    public News updateNews(@RequestBody News news) {
        return con.updateNews(news);

    }


}