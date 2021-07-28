package com.example.demosesion02.controller;

import com.example.demosesion02.model.Libro;
import com.example.demosesion02.repo.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private LibroRepository libroRepository;

    @GetMapping("/libros")
    List<Libro> getLibros(){
        return libroRepository.findAll();
    }

    @PostMapping("/libros")
    Libro crearLibro(@RequestBody @Validated Libro libro) {
        return libroRepository.save(libro);
    }

    @PutMapping("/libros/{id}")
    Libro actualizarLibro(@PathVariable Integer id, @RequestBody Libro libro) {
        Libro libroFonDB = libroRepository.getById(id);
        libro.setId(libroFonDB.getId());
        libroRepository.save(libro);
        return libro;
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/libros/{id}")
    void eliminarLibro(@PathVariable Integer id){
        libroRepository.deleteById(id);
    }
}
