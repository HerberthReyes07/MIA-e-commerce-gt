package com.archivos.backend.services;

import java.nio.CharBuffer;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.archivos.backend.dtos.CredentialsDto;
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
        newUser.setRole(userRoleRepository.findByName("admin"));
        userRepository.save(newUser);
        return userMapper.toUserDto(newUser);
    }

}
