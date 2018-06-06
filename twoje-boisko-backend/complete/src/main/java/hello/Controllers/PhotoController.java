package hello.Controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import hello.Helpers.Error_;
import hello.Helpers.ResultDto;
import hello.Models.SportObject;
import hello.Services.SportObjectService;
import hello.Services.StorageService;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/photo")
@RestController
public class PhotoController{

        
    @Autowired
    StorageService storageService;
    SportObjectService sportObjectService;

    private HttpHeaders responseHeaders;

    public PhotoController(){
        responseHeaders = new HttpHeaders();
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/post/{id_obiektu}",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> handleFileUpload(@PathVariable(value="id_obiektu") String id_obiektu, @RequestBody MultipartFile file) {
        Integer id = Integer.parseInt(id_obiektu);
        SportObject object_ = sportObjectService.findSportObjectById(id);
        if (object_.getId()==-1) return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Nie znaleziono obiektu a takim id"));
        ResultDto<String> result = storageService.store(file);
        if (result.isError()) return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_(result.getErrors()));
        object_.setPhotoName(result.getSUccesedResult());
        SportObject res = sportObjectService.updateSportObject(object_);
        if (res.getId()<0) return ResponseEntity.badRequest().headers(responseHeaders).body(new Error_("Bład w polaczeniu z baza danych"));
        return ResponseEntity.ok(res.getPhotoName());
        
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/get",method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getFile(@RequestParam(value="filename", required = true) String filename) throws IOException {
        ResultDto<Resource> res = storageService.loadFile(filename);
        if (res.isError()) return ResponseEntity.badRequest().headers(responseHeaders).body(res.getErrors());
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(new InputStreamResource(res.getSUccesedResult().getInputStream()));
    }
}

    