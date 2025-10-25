package com.archivos.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TopSellerInventoryDto {
 
    private Long sellerId;
    private String sellerName;
    private String sellerEmail;
    private String registrationDate;
    private Integer productsForSaleCount;
    private Integer totalStock;
    
}
