package com.archivos.backend.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.archivos.backend.dtos.CartDetailsDto;
import com.archivos.backend.dtos.CartDto;
import com.archivos.backend.dtos.CartItemDto;
import com.archivos.backend.services.CartService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CartController {
    
    private final CartService cartService;

    @PostMapping("/cart/items")
    public ResponseEntity<CartDto> addItemToCart(@RequestBody CartItemDto cartItemDto) {
        CartDto updatedCart = cartService.addItem(cartItemDto);
        return ResponseEntity.ok(updatedCart);
    }

    @GetMapping("/cart")
    public ResponseEntity<CartDto> getCart() {
        CartDto cart = cartService.getCart();
        return ResponseEntity.ok(cart);
    }

    @GetMapping("/cart/details")
    public ResponseEntity<List<CartDetailsDto>> getCartDetails() {
        List<CartDetailsDto> cartDetails = cartService.getCartDetails();
        return ResponseEntity.ok(cartDetails);
    }

    @PutMapping("/cart/items/{cartItemId}")
    public ResponseEntity<CartDto> updateItemQuantity(@PathVariable Long cartItemId, @RequestBody CartItemDto cartItemDto) {
        CartDto updatedCart = cartService.updateItemCartQuantity(cartItemId, cartItemDto.getQuantity());
        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping("/cart/items/{cartItemId}")
    public ResponseEntity<CartDto> deleteItemFromCart(@PathVariable Long cartItemId) {
        CartDto updatedCart = cartService.removeItemFromCart(cartItemId);
        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping("/cart/clear")
    public ResponseEntity<CartDto> clearCart() {
        CartDto clearedCart = cartService.clearCart();
        return ResponseEntity.ok(clearedCart);
    }

}
