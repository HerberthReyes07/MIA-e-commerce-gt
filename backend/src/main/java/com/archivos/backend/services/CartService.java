package com.archivos.backend.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.archivos.backend.dtos.CartDetailsDto;
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

        int productStock = product.getStock();

        if (item != null) {
            if (item.getQuantity() >= productStock) {
                throw new AppException("Tu carrito ya tiene la cantidad máxima de este producto", HttpStatus.BAD_REQUEST);
            }
            item.setQuantity(item.getQuantity() + 1);
            cartItemRepository.save(item);
        } else {
            if (productStock < 1) {
                throw new AppException("Cantidad solicitada excede el stock disponible", HttpStatus.BAD_REQUEST);
            }
            item = CartItem.builder()
                    .product(product)
                    .quantity(1)
                    .cart(cart)
                    .build();
            cartItemRepository.save(item);
            cart.addItem(item);
        }

        return cartMapper.toCartDto(cart);
    }

    public CartDto getCart() {
        UserDto customer = userService.getAuthUser();
        Cart cart = cartRepository.findActiveCart(customer.getId())
                .orElseThrow(() -> new AppException("Carrito no encontrado", HttpStatus.NOT_FOUND));
        return cartMapper.toCartDto(cart);
    }

    public List<CartDetailsDto> getCartDetails() {
        UserDto customer = userService.getAuthUser();
        
        Cart cart = cartRepository.findActiveCart(customer.getId()).orElseGet(null);

        if (cart == null) {
            return new ArrayList<>();
        }

        List<CartDetailsDto> cartDetails = new ArrayList<>();
        for (CartItem item : cart.getItems()) {
            Product product = item.getProduct();
            CartDetailsDto details = CartDetailsDto.builder()
                    .cartId(cart.getId())
                    .cartItemId(item.getId())
                    .quantity(item.getQuantity())
                    .productId(product.getId())
                    .productName(product.getName())
                    .productPrice(product.getPrice())
                    .productImageUrl(product.getImageUrl())
                    .productIsNew(product.getIsNew())
                    .build();
            cartDetails.add(details);
        }
        return cartDetails;
    }

    public CartDto updateItemCartQuantity(Long cartItemId, int quantity) {
        UserDto customer = userService.getAuthUser();
        Cart cart = cartRepository.findActiveCart(customer.getId())
                .orElseThrow(() -> new AppException("Carrito no encontrado", HttpStatus.NOT_FOUND));

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new AppException("Item del carrito no encontrado", HttpStatus.NOT_FOUND));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new AppException("El item no pertenece al carrito del usuario", HttpStatus.FORBIDDEN);
        }

        Product product = item.getProduct();
        int productStock = product.getStock();

        if (quantity > productStock) {
            throw new AppException("Cantidad solicitada excede el stock disponible", HttpStatus.BAD_REQUEST);
        }

        item.setQuantity(quantity);
        cartItemRepository.save(item);
        return cartMapper.toCartDto(cart);
    }

    public CartDto removeItemFromCart(Long cartItemId) {
        UserDto customer = userService.getAuthUser();
        Cart cart = cartRepository.findActiveCart(customer.getId())
                .orElseThrow(() -> new AppException("Carrito no encontrado", HttpStatus.NOT_FOUND));

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new AppException("Item del carrito no encontrado", HttpStatus.NOT_FOUND));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new AppException("El item no pertenece al carrito del usuario", HttpStatus.FORBIDDEN);
        }

        cart.removeItem(item);
        cartItemRepository.delete(item);
        return cartMapper.toCartDto(cart);
    }

    public CartDto clearCart() {
        UserDto customer = userService.getAuthUser();
        Cart cart = cartRepository.findActiveCart(customer.getId())
                .orElseThrow(() -> new AppException("Carrito no encontrado", HttpStatus.NOT_FOUND));

        for (CartItem item : cart.getItems()) {
            cartItemRepository.delete(item);
        }
        cart.getItems().clear();
        cartRepository.save(cart);
        return cartMapper.toCartDto(cart);
    }

}
