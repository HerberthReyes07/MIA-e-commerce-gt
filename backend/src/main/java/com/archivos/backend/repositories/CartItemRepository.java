package com.archivos.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.archivos.backend.entities.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCartId(Long cartId);
}
