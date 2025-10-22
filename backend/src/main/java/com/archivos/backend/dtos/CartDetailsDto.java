package com.archivos.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartDetailsDto {
    
    // Cart details
    private Long cartId;

    // CartItem details
    private Long cartItemId;
    private Integer quantity;

    // Product details
    private Long productId;
    private String productName;
    private Double productPrice;
    private String productImageUrl;
    private Boolean productIsNew;
}
