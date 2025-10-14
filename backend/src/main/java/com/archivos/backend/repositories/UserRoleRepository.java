package com.archivos.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.archivos.backend.entities.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {

    UserRole findByName(String name);
    
} 
