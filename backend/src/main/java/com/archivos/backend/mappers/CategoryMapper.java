package com.archivos.backend.mappers;

import org.mapstruct.Mapper;

import com.archivos.backend.dtos.CategoryDto;
import com.archivos.backend.entities.Category;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryDto toCategoryDto(Category category);
}
