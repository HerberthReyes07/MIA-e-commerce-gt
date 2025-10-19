package com.archivos.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.archivos.backend.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    
} 
