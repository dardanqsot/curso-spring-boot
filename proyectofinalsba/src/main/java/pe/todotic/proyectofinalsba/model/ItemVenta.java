package pe.todotic.proyectofinalsba.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class ItemVenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "iditem_venta")
    private Integer id;

    private Float precio;

    @Column(name = "num_desc_disp")
    private Integer numeroDescargasDisponibles;

    @ManyToOne
    @JoinColumn(name = "idlibro", referencedColumnName = "idlibro")
    private Libro libro;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "idventa", referencedColumnName = "idventa")
    private Venta venta;

    /**
     * Disminuye el numero de descargas disponibles en 1
     */
    public void disminuirDescargasDisponibles() {
        numeroDescargasDisponibles -= 1;
    }
}
