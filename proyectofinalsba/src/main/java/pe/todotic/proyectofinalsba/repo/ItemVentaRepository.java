package pe.todotic.proyectofinalsba.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.todotic.proyectofinalsba.model.ItemVenta;

@Repository
public interface ItemVentaRepository extends JpaRepository<ItemVenta, Integer> {
}
