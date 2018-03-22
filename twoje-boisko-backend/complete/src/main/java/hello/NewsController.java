package hello;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value="/news")
public class NewsController{

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/add", method = RequestMethod.POST)
    @ResponseBody
    public News addNews(@RequestBody News news) {
        NewsService con = new NewsService(); 
        news.setId(con.getfreeId());
        return con.addNews(news);  
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    @ResponseBody
    public String deleteNews(@RequestParam(value="id", required = true) String id) {
        NewsService con = new NewsService();
        Boolean tmp = con.deleteNews(Integer.parseInt(id));
        if ( tmp ) return "usunieto";
        else return "blad przy usuwaniu";

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/allNews")
    public List<News> getNews(){
        NewsService con = new NewsService();
        return con.getAllNews();
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value ="/update", method = RequestMethod.POST)
    @ResponseBody
    public News updateNews(@RequestBody News news) {
        NewsService con = new NewsService();
        return con.updateNews(news);

    }


}