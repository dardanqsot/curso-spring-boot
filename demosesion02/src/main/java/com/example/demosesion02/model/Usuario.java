package com.example.demosesion02.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idusuario")
    private Integer id;

    private String nombres;
    private String apellidos;
    private String email;
    private String password;
    private LocalDateTime fechaCreacion;

    @OneToMany(mappedBy = "usuario")
    private List<Venta> ventas;
}
