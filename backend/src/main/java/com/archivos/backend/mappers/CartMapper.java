package com.archivos.backend.mappers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.archivos.backend.dtos.CartDto;
import com.archivos.backend.dtos.CartItemDto;
import com.archivos.backend.entities.Cart;
import com.archivos.backend.entities.CartItem;

@Mapper(componentModel = "spring")
public interface CartMapper {

    @Mapping(target = "customerId", source = "customer.id")
    @Mapping(target = "items", source = "items", qualifiedByName = "cartItemsDtoFromEntities")
    CartDto toCartDto(Cart cart);

    @Mapping(target = "customer", ignore = true)
    @Mapping(target = "items", source = "items", qualifiedByName = "cartItemsFromDtos")
    Cart toCart(CartDto cartDto);

    @Named("cartItemFromDto")
    default CartItem cartItemFromDto(CartItemDto dto) {
        if (dto == null)
            return null;
        CartItem item = new CartItem();
        item.setId(dto.getId());
        item.setQuantity(dto.getQuantity());
        return item;
    }

    @Named("cartItemsFromDtos")
    default List<CartItem> cartItemsFromDtos(List<CartItemDto> dtos) {
        if (dtos == null)
            return Collections.emptyList();
        List<CartItem> list = new ArrayList<>(dtos.size());
        for (CartItemDto dto : dtos) {
            CartItem item = cartItemFromDto(dto);
            if (item != null)
                list.add(item);
        }
        return list;
    }

    @Named("cartItemDtoFromEntity")
    default CartItemDto cartItemDtoFromEntity(CartItem item) {
        if (item == null)
            return null;
        CartItemDto dto = new CartItemDto();
        dto.setId(item.getId());
        dto.setQuantity(item.getQuantity());
        dto.setProductId(item.getProduct().getId());
        dto.setCartId(item.getCart().getId());
        return dto;
    }

    @Named("cartItemsDtoFromEntities")
    default List<CartItemDto> cartItemsDtoFromEntities(List<CartItem> items) {
        if (items == null)
            return Collections.emptyList();
        List<CartItemDto> list = new ArrayList<>(items.size());
        for (CartItem item : items) {
            CartItemDto dto = cartItemDtoFromEntity(item);
            if (dto != null) {
                list.add(dto);
            }
        }
        return list;
    }
}
