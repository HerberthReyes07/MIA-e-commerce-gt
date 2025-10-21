package com.archivos.backend.dtos;

public record EmployeeRegisterDto(String firstName, String lastName, String email, char[] password, String position, String phone) {
}
