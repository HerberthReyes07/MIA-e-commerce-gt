package com.archivos.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.archivos.backend.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    
    List<Product> findAllByOwnerId(Long ownerId);

}
