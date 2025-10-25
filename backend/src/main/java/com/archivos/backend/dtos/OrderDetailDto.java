package com.archivos.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetailDto {
    Long id;
    Integer quantity;
    Double subtotal;
    Double platformFee;
    Double sellerEarnings;
    Long orderId;
    Long productId;
}
