package com.archivos.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.archivos.backend.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    
}
