package pe.todotic.proyectofinalsba.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.todotic.proyectofinalsba.model.Libro;
import pe.todotic.proyectofinalsba.model.Venta;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Integer> {
}
