package com.archivos.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.archivos.backend.dtos.CartItemDto;
import com.archivos.backend.entities.CartItem;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface CartItemMapper {

    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "cartId", source = "cart.id")
    CartItemDto toCartItemDto(CartItem cartItem);
    
    @Mapping(target = "product", ignore = true)
    @Mapping(target = "cart", ignore = true)
    CartItem toCartItem(CartItemDto cartItemDto);
}
