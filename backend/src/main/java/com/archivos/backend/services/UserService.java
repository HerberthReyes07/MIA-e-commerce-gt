package com.archivos.backend.services;

import java.nio.CharBuffer;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.archivos.backend.dtos.CredentialsDto;
import com.archivos.backend.dtos.EmployeeDto;
import com.archivos.backend.dtos.EmployeeRegisterDto;
import com.archivos.backend.dtos.SignUpDto;
import com.archivos.backend.dtos.UserDto;
import com.archivos.backend.entities.User;
import com.archivos.backend.exceptions.AppException;
import com.archivos.backend.mappers.UserMapper;
import com.archivos.backend.repositories.UserRepository;
import com.archivos.backend.repositories.UserRoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findByEmail(credentialsDto.email())
                .orElseThrow(() -> new AppException("Credenciales inválidas", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.password()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }

        throw new AppException("Credenciales inválidas", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto signUpDto) {

        Optional<User> existingUser = userRepository.findByEmail(signUpDto.email());
        if (existingUser.isPresent()) {
            throw new AppException("El email ya está registrado", HttpStatus.BAD_REQUEST);
        }

        User newUser = userMapper.signUpToUser(signUpDto);
        newUser.setPassword(passwordEncoder.encode(CharBuffer.wrap(signUpDto.password())));
        newUser.setRole(userRoleRepository.findByName("customer"));
        userRepository.save(newUser);
        return userMapper.toUserDto(newUser);
    }

    public EmployeeDto registerEmployee(EmployeeRegisterDto employeeRegisterDto) {

        Optional<User> existingEmployee = userRepository.findByEmail(employeeRegisterDto.email());
        if (existingEmployee.isPresent()) {
            throw new AppException("El email ya está registrado", HttpStatus.BAD_REQUEST);
        }

        User newUser = userMapper.employeeRegisterToUser(employeeRegisterDto);
        newUser.setPassword(passwordEncoder.encode(CharBuffer.wrap(employeeRegisterDto.password())));
        newUser.setRole(userRoleRepository.findByName(employeeRegisterDto.position()));
        User savedUser = userRepository.save(newUser);
        return userMapper.toEmployeeDto(savedUser);
    }

    public EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto) {

        User employee = userRepository.findById(id)
                .orElseThrow(() -> new AppException("Empleado no encontrado", HttpStatus.NOT_FOUND));

        userMapper.updateEmployeeFromDto(employeeDto, employee);
        userRepository.save(employee);
        return userMapper.toEmployeeDto(employee);
    }

    public List<EmployeeDto> getAllEmployees() {

        Long currentUserId = getAuthUser().getId();

        List<User> employees = userRepository.findAllEmployees(currentUserId);
        return employees.stream()
                .map(userMapper::toEmployeeDto)
                .toList();
    }

    public UserDto getAuthUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (UserDto) auth.getPrincipal();
    }

    public UserDto getModeratorWithLeastPendingRequests() {
        User moderator = userRepository.findModeratorWithLeastPendingRequests();
        return userMapper.toUserDto(moderator);
    }

    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException("Usuario no encontrado", HttpStatus.NOT_FOUND));
        return userMapper.toUserDto(user);
    }

}
