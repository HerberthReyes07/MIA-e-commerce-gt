package com.archivos.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TopBuyerOrdersDto {

    private Long buyerId;
    private String buyerName;
    private String buyerEmail;
    private String registrationDate;
    private Integer totalOrders;
    private Double totalSpent;

}
