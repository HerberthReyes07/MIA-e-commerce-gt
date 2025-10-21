package com.archivos.backend.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.archivos.backend.dtos.EmployeeDto;
import com.archivos.backend.dtos.EmployeeRegisterDto;
import com.archivos.backend.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/employees")
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        List<EmployeeDto> employees = userService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @PostMapping("/employees")
    public ResponseEntity<EmployeeDto> registerEmployee(@RequestBody EmployeeRegisterDto employeeRegisterDto) {
        EmployeeDto employee = userService.registerEmployee(employeeRegisterDto);
        return ResponseEntity.created(URI.create("/employees/" + employee.getId())).body(employee);
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long id,
            @RequestBody EmployeeDto employeeDto) {
        EmployeeDto updatedEmployee = userService.updateEmployee(id, employeeDto);
        return ResponseEntity.ok(updatedEmployee);
    }

}
