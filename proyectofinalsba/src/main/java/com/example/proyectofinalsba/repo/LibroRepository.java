package com.example.proyectofinalsba.repo;

import com.example.proyectofinalsba.model.Libro;
import com.example.proyectofinalsba.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LibroRepository extends JpaRepository<Libro, Integer> {
    boolean existsBySlug(String slug);

    Optional<Usuario> findOneBySlug(String slug);

    boolean existsBySlugAndIdNot(String slug, Integer idNot);
}
