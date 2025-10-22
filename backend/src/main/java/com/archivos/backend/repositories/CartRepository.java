package com.archivos.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.archivos.backend.entities.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

    @Query("select c from Cart c join fetch c.customer cst where cst.id = :customerId and c.isActive = true")
    Optional<Cart> findActiveCart(@Param("customerId") Long customerId);

}
