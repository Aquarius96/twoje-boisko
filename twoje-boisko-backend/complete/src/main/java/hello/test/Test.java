package hello.test;

import hello.Helpers.*;
import hello.Models.*;
import hello.Services.StorageService;

import java.io.IOException;


import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/test")
@RestController
public class Test{
    
    private HttpHeaders responseHeaders;
    private Hash hash;
    
    @Autowired
    StorageService storageService;

    public Test(){
        hash=new Hash();
        responseHeaders = new HttpHeaders();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/post",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> handleFileUpload(@RequestBody MultipartFile file) {
        String message = "";
		try {
			storageService.store(file);
 
			message = "You successfully uploaded " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.OK).body(message);
		} catch (Exception e) {
			message = "FAIL to upload " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}
        //return ResponseEntity.ok(file.getSize());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/get",method = RequestMethod.GET)
    @ResponseBody
	public ResponseEntity<?> getFile(@RequestParam(value="filename", required = true) String filename) throws IOException {
        Resource res = storageService.loadFile(filename);
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(new InputStreamResource(res.getInputStream()));
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