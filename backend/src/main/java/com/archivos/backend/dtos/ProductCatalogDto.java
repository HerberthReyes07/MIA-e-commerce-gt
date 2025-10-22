package com.archivos.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO mínimo para mostrar productos en el catálogo (card).
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductCatalogDto {
    private Long id;
    private String name;
    private Double price;
    private String imageUrl;
    private Boolean isNew;
}
