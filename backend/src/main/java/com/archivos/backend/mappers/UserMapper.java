package com.archivos.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.archivos.backend.dtos.EmployeeDto;
import com.archivos.backend.dtos.EmployeeRegisterDto;
import com.archivos.backend.dtos.SignUpDto;
import com.archivos.backend.dtos.UserDto;
import com.archivos.backend.entities.User;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {

    @Mapping(target = "role", source = "role.name")
    @Mapping(target = "token", ignore = true)
    UserDto toUserDto(User user);

    @Mapping(target = "role", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "registrationDate", ignore = true)
    @Mapping(target = "address", ignore = true)
    @Mapping(target = "phone", ignore = true)
    User toUser(UserDto userDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "registrationDate", ignore = true)
    User signUpToUser(SignUpDto signUpDto);

    @Mapping(target = "position", source = "role.name")
    EmployeeDto toEmployeeDto(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "registrationDate", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "address", ignore = true)
    User employeeRegisterToUser(EmployeeRegisterDto employeeRegisterDto);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "address", ignore = true)
    void updateEmployeeFromDto(EmployeeDto employeeDto, @MappingTarget User user);

}
