package com.launchcode.crescendo.backend.controllers;
import com.launchcode.crescendo.backend.UploadedFile;
import com.launchcode.crescendo.backend.repository.UploadedFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.List;

@RestController
public class FileUploadController {
    @Autowired
    private UploadedFileRepository fileRepository;
    @CrossOrigin(origins = "*")
    @PostMapping("/upload")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            // Get the file and save it somewhere
            UploadedFile uploadedFile = new UploadedFile();
            uploadedFile.setFileName(file.getOriginalFilename());
            uploadedFile.setFileType(file.getContentType());
            //uploadedFile.setData(file.getBytes());

            String base64Data = Base64.getEncoder().encodeToString(file.getBytes());
            uploadedFile.setData(base64Data.getBytes());

            System.out.println("MIME type: " + file.getContentType());  // Add this line


            uploadedFile = fileRepository.save(uploadedFile);

            return ResponseEntity.ok(uploadedFile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File upload failed: " + e.getMessage());
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/files")
    public List<UploadedFile> getAllFiles() {
        return fileRepository.findAll();
    }
}