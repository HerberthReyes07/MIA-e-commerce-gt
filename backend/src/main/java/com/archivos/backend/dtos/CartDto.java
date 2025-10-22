package com.archivos.backend.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartDto {
    private Long id;
    private Boolean isActive;
    private String creationDate;
    private Long customerId;
    private List<CartItemDto> items;
}
