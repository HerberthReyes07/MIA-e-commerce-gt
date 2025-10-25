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
public class OrderDto {

    Long id;
    String orderDate;
    String deliveryDate;
    Integer status;
    Double totalAmount;
    Long buyerId;
    List<OrderDetailDto> orderDetails;
}
