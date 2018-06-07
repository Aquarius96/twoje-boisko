package hello.Services;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import hello.Helpers.ResultDto;
 

@Service
public class StorageService {

	private Integer maxBytes = 10485760;
	private ArrayList<String> supported = new ArrayList<String>();
	
    public StorageService(){
		supported.add(".jpg");
		supported.add(".jpeg");
		supported.add(".png");
		try {
            if (!Files.exists(rootLocation)) Files.createDirectory(rootLocation);

		} catch (IOException e) {
			throw new RuntimeException("Could not initialize storage!");
		}
    }
 
	Logger log = LoggerFactory.getLogger(this.getClass().getName());
	private final Path rootLocation = Paths.get("upload-dir");
 
	public Boolean isSupported(String targetValue) {
		Set<String> set = new HashSet<String>(supported);
		return set.contains(getExtension(targetValue));
	}

	public ResultDto<String> store(MultipartFile file) {
		ResultDto<String> result = new ResultDto<>();
		ResultDto<Boolean> res = checkFile(file);
		if (res.isError()){
			result.setErrors(res.getErrors());
			return result;
		}
		try {
            UUID uid = UUID.randomUUID();
            String name = uid.toString()+getExtension(file.getOriginalFilename());
			Files.copy(file.getInputStream(), this.rootLocation.resolve(name));
			result.setSuccesec(name);
		} catch (Exception e) {
			result.addError("Bład przy zapisywaniu zdjecia do DB");
		}
		return result;
    }
	
	private ResultDto<Boolean> checkFile(MultipartFile file){
		ResultDto<Boolean> result = new ResultDto<>();
		if (file.getSize()<=0 || file.isEmpty()) result.addError("Brak pliku");
		if (file.getSize()>maxBytes) result.addError("Plik jhest za duzy");
		if (!isSupported(file.getOriginalFilename())) result.addError("Nie obslugiwany typ pliku");
		result.setSuccesec(true);
		return result;

	}
	
    private String getExtension(String name){
        String extension = "";

        int i = name.lastIndexOf('.');
        if (i > 0) {
            extension = name.substring(i);
        }
        return extension;
    }
 
	public ResultDto<Resource> loadFile(String filename) {
		ResultDto<Resource> result = new ResultDto<>();
		try {
			Path file = rootLocation.resolve(filename);
			Resource resource = new UrlResource(file.toUri());
			if (resource.exists() || resource.isReadable()) {
				result.setSuccesec(resource);
			} else {
				result.addError("Zdjecie nie istnieje lub jest nieczytelne");
			}
		} catch (MalformedURLException e) {
			result.addError("Zdjecie nie istnieje");
		}
		return result;
    }
 
	public void deleteAll() {
		FileSystemUtils.deleteRecursively(rootLocation.toFile());
	}
 

}