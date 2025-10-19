package com.archivos.backend.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {

    private static final Path FOLDER_PATH = Path.of("src/main/resources/static/images");

    public String saveImage(MultipartFile image) {
        try {
            // Carpeta destino (src/main/resources/static/images)
            File dir = new File(FOLDER_PATH.toString());
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // Nombre único para la imagen
            String extension = "";
            String originalName = image.getOriginalFilename();
            int dotIdx = originalName != null ? originalName.lastIndexOf('.') : -1;
            if (dotIdx > 0) {
                extension = originalName.substring(dotIdx);
            }
            String filename = UUID.randomUUID().toString() + extension;

            // Ruta destino
            Path destination = FOLDER_PATH.resolve(filename);
            Files.copy(image.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

            // Retornar url local (para frontend)
            return "/images/" + filename;
        } catch (IOException e) {
            // Si falla la subida, devolver null
            return null;
        }
    }

    public void deleteImage(String imageUrl) {
        if (imageUrl == null || imageUrl.isEmpty())
            return;

        try {
            String filename = Path.of(imageUrl).getFileName().toString();
            Path imagePath = FOLDER_PATH.resolve(filename);
            Files.deleteIfExists(imagePath);
        } catch (IOException e) {
            // Ignorar errores al borrar la imagen
        }
    }
}
