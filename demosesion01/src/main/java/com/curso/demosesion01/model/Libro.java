package com.curso.demosesion01.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class Libro {
    private Integer id;
    private String titulo;
    private LocalDate fechaCreacion;
}
