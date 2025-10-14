package com.archivos.backend.dtos;

public record SignUpDto(String firstName, String lastName, String email, char[] password, String phone, String address) {
    
}
