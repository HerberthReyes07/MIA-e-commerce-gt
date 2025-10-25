package com.archivos.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TopBuyerRevenueDto {
    
    private Long customerId;
    private String customerName;
    private String customerEmail;
    private Integer totalOrders;
    private Double totalPlatformRevenue;
    private Double averagePlatformRevenue;

}
