package hello.Services;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class StorageService {

    public StorageService(){
		try {
            if (!Files.exists(rootLocation)) Files.createDirectory(rootLocation);

		} catch (IOException e) {
			throw new RuntimeException("Could not initialize storage!");
		}
    }
 
	Logger log = LoggerFactory.getLogger(this.getClass().getName());
	private final Path rootLocation = Paths.get("upload-dir");
 
	public void store(MultipartFile file) {
		try {
            UUID uid = UUID.randomUUID();
            String name = uid.toString()+getExtension(file.getOriginalFilename());
			Files.copy(file.getInputStream(), this.rootLocation.resolve(name));
		} catch (Exception e) {
			throw new RuntimeException("FAIL!");
		}
    }
    
    private String getExtension(String name){
        String extension = "";

        int i = name.lastIndexOf('.');
        if (i > 0) {
            extension = name.substring(i);
        }
        return extension;
    }
 
	public Resource loadFile(String filename) {
		try {
			Path file = rootLocation.resolve(filename);
			Resource resource = new UrlResource(file.toUri());
			if (resource.exists() || resource.isReadable()) {
				return resource;
			} else {
				throw new RuntimeException("FAIL!");
			}
		} catch (MalformedURLException e) {
			throw new RuntimeException("FAIL!");
		}
    }
 
	public void deleteAll() {
		FileSystemUtils.deleteRecursively(rootLocation.toFile());
	}
 

}