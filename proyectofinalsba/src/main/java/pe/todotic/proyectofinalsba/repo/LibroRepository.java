package pe.todotic.proyectofinalsba.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.todotic.proyectofinalsba.model.Libro;

import java.util.List;
import java.util.Optional;

@Repository
public interface LibroRepository extends JpaRepository<Libro, Integer> {
    boolean existsBySlug(String slug);

    Optional<Libro> findOneBySlug(String slug);

    boolean existsBySlugAndIdNot(String slug, Integer idNot);

    List<Libro> findTop6ByOrderByFechaCreacionDesc();
}
