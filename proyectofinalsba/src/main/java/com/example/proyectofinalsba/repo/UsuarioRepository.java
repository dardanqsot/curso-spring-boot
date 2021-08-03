package com.example.proyectofinalsba.repo;

import com.example.proyectofinalsba.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByEmail(String email);
    /*
    @Query(value = "select * from Usuario where email = :name", nativeQuery = true)
    boolean existePorEmail(@Param(":name") String email);
    */

    boolean existsByEmail(String email);
}
