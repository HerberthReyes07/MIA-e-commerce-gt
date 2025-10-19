package com.archivos.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.archivos.backend.dtos.CategoryDto;
import com.archivos.backend.dtos.ProductDto;
import com.archivos.backend.entities.Product;
import com.archivos.backend.entities.User;
import com.archivos.backend.entities.Category;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Mapper(componentModel = "spring", uses = {
        CategoryMapper.class }, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ProductMapper {

    // Entity -> DTO
    @Mapping(target = "ownerId", source = "owner.id")
    ProductDto toProductDto(Product product);

    // DTO -> Entity (construyendo referencias por id)
    @Mapping(target = "owner", source = "ownerId", qualifiedByName = "ownerFromId")
    @Mapping(target = "categories", source = "categories", qualifiedByName = "categoriesFromDtos")
    Product toProduct(ProductDto productDto);

    @Named("ownerFromId")
    default User ownerFromId(Long ownerId) {
        if (ownerId == null)
            return null;
        User u = new User();
        u.setId(ownerId);
        return u;
    }

    @Named("categoryFromDto")
    default Category categoryFromDto(CategoryDto dto) {
        if (dto == null)
            return null;
        Category c = new Category();
        c.setId(dto.getId());
        return c;
    }

    @Named("categoriesFromDtos")
    default List<Category> categoriesFromDtos(List<CategoryDto> dtos) {
        if (dtos == null)
            return Collections.emptyList();
        List<Category> list = new ArrayList<>(dtos.size());
        for (CategoryDto dto : dtos) {
            Category c = categoryFromDto(dto);
            if (c != null)
                list.add(c);
        }
        return list;
    }

    // Actualizar entidad desde DTO
    @Mapping(target = "owner", ignore = true)
    // @Mapping(target = "imageUrl", ignore = true)
    @Mapping(target = "categories", source = "categories", qualifiedByName = "categoriesFromDtos")
    void updateProductFromDto(ProductDto productDto, @MappingTarget Product product);
}
