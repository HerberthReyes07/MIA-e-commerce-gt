package com.archivos.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.archivos.backend.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);

    @Query("select u from User u join fetch u.role where u.email = :email")
    Optional<User> findByEmailWithRole(@Param("email") String email);
    
} 
