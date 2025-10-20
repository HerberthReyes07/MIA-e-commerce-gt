package com.archivos.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.archivos.backend.dtos.ProductModerationRequestDto;
import com.archivos.backend.entities.Product;
import com.archivos.backend.entities.ProductModerationRequest;
import com.archivos.backend.entities.User;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ProductModerationRequestMapper {

    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "moderatorId", source = "moderator.id")
    ProductModerationRequestDto toProductModerationRequestDto(ProductModerationRequest entity);

    @Mapping(target = "product", source = "productId", qualifiedByName = "productFromId")
    @Mapping(target = "moderator", source = "moderatorId", qualifiedByName = "moderatorFromId")
    ProductModerationRequest toProductModerationRequest(ProductModerationRequestDto dto);

    @Named("productFromId")
    default Product productFromId(Long productId) {
        if (productId == null)
            return null;
        Product p = new Product();
        p.setId(productId);
        return p;
    }

    @Named("moderatorFromId")
    default User moderatorFromId(Long moderatorId) {
        if (moderatorId == null)
            return null;
        User u = new User();
        u.setId(moderatorId);
        return u;
    }

    @Mapping(target = "moderator", ignore = true)
    @Mapping(target = "product", ignore = true)
    void updateProductModerationRequestFromDto(ProductModerationRequestDto dto,
            @MappingTarget ProductModerationRequest entity);
}
