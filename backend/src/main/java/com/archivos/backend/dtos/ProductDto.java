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
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    private Boolean isNew;
    private Integer reviewStatus;
    private String imageUrl;
    private List<CategoryDto> categories;
    private Long ownerId;
    private String creationDate;
    private String lastUpdatedDate;
}
