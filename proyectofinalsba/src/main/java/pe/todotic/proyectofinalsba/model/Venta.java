package pe.todotic.proyectofinalsba.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idventa")
    private Integer id;

    private LocalDateTime fecha;

    private Float total;

    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL)
    private List<ItemVenta> items;

    @ManyToOne()
    @JoinColumn(name = "idusuario", referencedColumnName = "idusuario")
    private Usuario usuario;
}
