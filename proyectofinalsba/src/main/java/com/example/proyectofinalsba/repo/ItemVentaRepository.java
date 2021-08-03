package com.example.proyectofinalsba.repo;

import com.example.proyectofinalsba.model.ItemVenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemVentaRepository extends JpaRepository<ItemVenta, Integer> {
}
