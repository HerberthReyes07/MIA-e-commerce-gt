package com.archivos.backend.services;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.archivos.backend.dtos.CartDto;
import com.archivos.backend.dtos.CartItemDto;
import com.archivos.backend.dtos.UserDto;
import com.archivos.backend.entities.Cart;
import com.archivos.backend.entities.CartItem;
import com.archivos.backend.entities.Product;
import com.archivos.backend.exceptions.AppException;
import com.archivos.backend.mappers.CartMapper;
import com.archivos.backend.mappers.UserMapper;
import com.archivos.backend.repositories.CartItemRepository;
import com.archivos.backend.repositories.CartRepository;
import com.archivos.backend.repositories.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final UserService userService;
    private final UserMapper userMapper;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;
    private final CartMapper cartMapper;

    public CartDto addItem(CartItemDto cartItemDto) {
        // Lógica para agregar un ítem al carrito

        UserDto customer = userService.getAuthUser();
        Cart cart = cartRepository.findActiveCart(customer.getId()).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setCustomer(userMapper.toUser(customer));
            return cartRepository.save(newCart);
        });

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(cartItemDto.getProductId()))
                .findFirst()
                .orElse(null);

        Product product = productRepository.findById(cartItemDto.getProductId()).orElse(null);
        if (product == null) {
            throw new AppException("Producto no encontrado", HttpStatus.NOT_FOUND);
        }

        int actualStock = product.getStock();

        if (item != null) {
            if (item.getQuantity() >= actualStock) {
                throw new AppException("Tu carrito ya tiene la cantidad máxima de este producto", HttpStatus.BAD_REQUEST);
            }
            item.setQuantity(item.getQuantity() + 1);
            cartItemRepository.save(item);
        } else {
            if (actualStock < 1) {
                throw new AppException("Cantidad solicitada excede el stock disponible", HttpStatus.BAD_REQUEST);
            }
            item = new CartItem();
            item.setProduct(product);
            item.setQuantity(1);
            item.setCart(cart);
            cartItemRepository.save(item);
            cart.getItems().add(item);
        }

        return cartMapper.toCartDto(cart);
    }

}
