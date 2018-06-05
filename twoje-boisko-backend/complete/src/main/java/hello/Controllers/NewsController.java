package hello.Controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import hello.Helpers.*;
import hello.Models.*;
import hello.Services.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value="/news")
public class NewsController{

    private NewsService con;
    private HttpHeaders responseHeaders;
    public NewsController(){
        con = new NewsService(); 
        responseHeaders = new HttpHeaders();
    }
    

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value ="/add", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> addNews(@RequestBody News news) {
        News result = con.addNews(news);
        switch(result.getId()){
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("prawdopodobnie podales zle dane"));
            case -2:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("blad polaczenia"));
		    default :
                return ResponseEntity.ok(result);
        }
        
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> deleteNews(@RequestBody Index_ id) {
        Boolean tmp = con.deleteNews(id.getId());
        if ( tmp ) id.setValue("usunieto");
        else id.setValue("blad przy usuwaniu");
        return ResponseEntity.accepted().body(id);

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/allNews")
    public ResponseEntity<?> getNews(){
        return ResponseEntity.accepted().body(con.getAllNews());
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value ="/update", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> updateNews(@RequestBody News news) {
        News result = con.updateNews(news);
        switch(result.getId()){
            case -1:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("prawdopodobnie podales zle dane"));
            case -2:
                return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("blad polaczenia"));
		    default :
                return ResponseEntity.ok(result);
        }
    }


}