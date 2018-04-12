package hello.test;

import hello.Models.*;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/test")
@RestController
public class Test{

    @CrossOrigin(origins = "http://localhost:3000/")
    @ResponseBody
    @RequestMapping(value = "/geterro")
    public ResponseEntity<?> test() {
        HttpHeaders responseHeaders = new HttpHeaders();
        return ResponseEntity.ok().headers(responseHeaders).body(new Result("99"));
    }
    @CrossOrigin(origins = "http://localhost:3000/")
    @ResponseBody
    @RequestMapping(value = "/getuser")
    public ResponseEntity<?> test1() {
        HttpHeaders responseHeaders = new HttpHeaders();
        return ResponseEntity.ok().headers(responseHeaders).body(new User(99,"Isard","lsard"));
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value = "/getjwt")
    @ResponseBody
    public ResponseEntity<?> test2() {
        HttpHeaders responseHeaders = new HttpHeaders();
        return ResponseEntity.ok().headers(responseHeaders).body(new Result("jwt","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJJc2FyZCIsInBhc3N3b3JkIjoiSGFzbG8xMjMiLCJmaXJzdG5hbWUiOiJNYXJjaW4iLCJsYXN0bmFtZSI6IlphcGFka2EiLCJlbWFpbCI6InphcGFka2FAd3AucGwiLCJwaG9uZSI6IjY2NjI0MDgyMyJ9.MWc6WyEwzcrYcGClrE8zsUM5CSrXZRs39Z_i5Z9Q9sY"));
    }
}