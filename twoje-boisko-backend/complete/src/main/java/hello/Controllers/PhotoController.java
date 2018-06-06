package hello.Controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import hello.Helpers.Error_;
import hello.Services.StorageService;

public class PhotoController{

        
    @Autowired
    StorageService storageService;

    private HttpHeaders responseHeaders;

    public PhotoController(){
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
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            message = "FAIL to upload " + file.getOriginalFilename() + "!";
            return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_(message));
        }
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
}

    