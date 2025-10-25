package com.archivos.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.archivos.backend.entities.CreditCard;

public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {
    
    public List<CreditCard> findByCustomerId(Long customerId);

}
