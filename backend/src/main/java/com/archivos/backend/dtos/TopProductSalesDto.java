package com.archivos.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TopProductSalesDto {
    
    private Long productId;
    private String productName;
    private Double productPrice;
    private Boolean productIsNew;
    private String ownerName;     // firstName + lastName
    private String ownerEmail;
    private Integer totalUnitsSold;
    private Double totalRevenue;
}
