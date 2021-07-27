package com.curso.demosesion01.controller;

import com.curso.demosesion01.model.Libro;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ApiController {

    private final static List<Libro> LIBROS = new ArrayList<>();

    static {
        LIBROS.add(new Libro(1,"Programación en Java", LocalDate.now()));
        LIBROS.add(new Libro(2,"Desarrollo web con Spring boot", LocalDate.now().plusDays(30)));
        LIBROS.add(new Libro(3,"Microservicios", LocalDate.now().plusYears(1)));
    }
    @GetMapping("/hola-mundo")
    String holaMundo(@RequestParam(defaultValue = "mundo") String nombre){
        return "Hola " + nombre + "!";
    }
    @GetMapping("/libros")
    List<Libro> getLibros(){
        return LIBROS;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/libros")
    Libro crearLibro(@RequestBody Libro libro){
        LIBROS.add(libro);
        return libro;
    }

    @PutMapping("/libros/{id}")
    Libro actualizarLibro(@PathVariable Integer id, @RequestBody Libro libroform){
        Libro libro = LIBROS.stream().filter( l -> l.getId().equals(id)).findFirst().get();
        libro.setTitulo(libroform.getTitulo());
        libro.setFechaCreacion(libroform.getFechaCreacion());

        // Almacenar en la base de datos
        return libro;
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/libros/{id}")
    void eliminarLibro(@PathVariable Integer id){
        LIBROS.removeIf(l -> l.getId().equals(id));
    }

}
