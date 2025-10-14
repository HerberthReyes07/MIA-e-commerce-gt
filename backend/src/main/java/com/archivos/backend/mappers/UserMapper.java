package com.archivos.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.archivos.backend.dtos.SignUpDto;
import com.archivos.backend.dtos.UserDto;
import com.archivos.backend.entities.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    
    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);
    
}
