package com.example.proyectofinalsba.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@Entity
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idlibro")
    private Integer id;

    @NotBlank
    private String titulo;

    @NotBlank
    private String slug;

    @NotBlank
    private String descripcion;

    @NotNull
    private Float precio;

    @NotBlank
    private String rutaPortada;

    @NotBlank
    private String rutaArchivo;


    private LocalDateTime fechaCreacion;

    @Transient //Proiedad volatil qno se va a almacenar
    private String urlPortada;

    @Transient
    private String urlArchivo;

    @PrePersist
    private void asignarFechaCreacion(){
        fechaCreacion = LocalDateTime.now();

    }

}
