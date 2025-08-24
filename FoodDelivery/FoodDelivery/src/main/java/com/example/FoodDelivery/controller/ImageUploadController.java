package com.example.FoodDelivery.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/images")
public class ImageUploadController {

    @Value("${app.upload.dir}")
    private String uploadDir;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("No file selected");
        }

        // Generate unique filename
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();

        // Create directory if not exists
        Path path = Paths.get(uploadDir, filename);
        Files.createDirectories(path.getParent());

        // Save the file
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        return ResponseEntity.ok(filename);
    }
}
