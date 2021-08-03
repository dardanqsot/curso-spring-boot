package com.example.proyectofinalsba.api;

import com.example.proyectofinalsba.service.FileSystemStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RequestMapping("/api/assets")
public class AssetsController extends  BaseController{

    @Autowired
    private FileSystemStorageService fileSystemStorageService;

    @GetMapping("/{filename:.+}")
    Resource getResource(String nombre) {
        return fileSystemStorageService.loadAsResource(nombre);
    }
    @PostMapping("/upload")
    Map<String, String> subirArchivo(@RequestParam("file") MultipartFile multipartFile){
        System.out.println("EN SUBIR ARCHIVO!!!");
        String rutaArchivo = fileSystemStorageService.store(multipartFile);
        String rutaAbsoluta = buildUriString(rutaArchivo);

        Map<String, String> resultado = new HashMap<>();
        resultado.put("ruta", rutaArchivo);
        resultado.put("url", rutaAbsoluta);

        return resultado;
    }
}
