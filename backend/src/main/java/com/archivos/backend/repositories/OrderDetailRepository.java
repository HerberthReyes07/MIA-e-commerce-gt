package com.archivos.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.archivos.backend.entities.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    
}
