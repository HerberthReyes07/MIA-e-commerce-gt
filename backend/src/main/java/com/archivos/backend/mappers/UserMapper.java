package com.archivos.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.archivos.backend.dtos.SignUpDto;
import com.archivos.backend.dtos.UserDto;
import com.archivos.backend.entities.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    
    @Mapping(target = "role", source = "role.name")
    @Mapping(target = "token", ignore = true)
    UserDto toUserDto(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "registrationDate", ignore = true)
    User signUpToUser(SignUpDto signUpDto);
    
}
