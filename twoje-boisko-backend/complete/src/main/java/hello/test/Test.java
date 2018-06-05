package hello.test;

import hello.Helpers.*;
import hello.Models.*;


import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/test")
@RestController
public class Test{
    
    private HttpHeaders responseHeaders;
    private Hash hash;

    public Test(){
        hash=new Hash();
        responseHeaders = new HttpHeaders();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/checkhash",method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> test5(@RequestParam(value="code", required = true) String code) {
        return ResponseEntity.accepted().headers(responseHeaders).body(hash.checkHash(code,"dupa"));
    }

        
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/hash",method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> test3(@RequestParam(value="code", required = true) String code){

        return ResponseEntity.accepted().headers(responseHeaders).body(hash.getFreshHash(code));
    }   

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/dehash",method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> test4(@RequestParam(value="code", required = true) String code){
        return ResponseEntity.accepted().headers(responseHeaders).body(hash.deHash(code));
    } 

    @CrossOrigin(origins = "http://localhost:3000/")
    @ResponseBody
    @RequestMapping(value = "/geterro")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok().headers(responseHeaders).body(new Error_("99"));
    }
    @CrossOrigin(origins = "http://localhost:3000/")
    @ResponseBody
    @RequestMapping(value = "/getuser")
    public ResponseEntity<?> test1() {
        return ResponseEntity.ok().headers(responseHeaders).body(new User(99,"Isard","lsard"));
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value = "/getjwt")
    @ResponseBody
    public ResponseEntity<?> test2() {
        return ResponseEntity.ok().headers(responseHeaders).body(new Error_("jwt","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJJc2FyZCIsInBhc3N3b3JkIjoiSGFzbG8xMjMiLCJmaXJzdG5hbWUiOiJNYXJjaW4iLCJsYXN0bmFtZSI6IlphcGFka2EiLCJlbWFpbCI6InphcGFka2FAd3AucGwiLCJwaG9uZSI6IjY2NjI0MDgyMyJ9.MWc6WyEwzcrYcGClrE8zsUM5CSrXZRs39Z_i5Z9Q9sY"));
    }
}