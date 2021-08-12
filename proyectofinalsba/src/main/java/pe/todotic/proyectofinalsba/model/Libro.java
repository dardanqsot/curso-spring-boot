package pe.todotic.proyectofinalsba.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Data
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

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private LocalDateTime fechaCreacion;

    @Transient
    private String urlPortada;

    @Transient
    private String urlArchivo;

    @PrePersist
    private void asignarFechaCreacion() {
        fechaCreacion = LocalDateTime.now();
    }
}
