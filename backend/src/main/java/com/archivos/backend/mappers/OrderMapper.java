package com.archivos.backend.mappers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.archivos.backend.dtos.OrderDetailDto;
import com.archivos.backend.dtos.OrderDto;
import com.archivos.backend.entities.Order;
import com.archivos.backend.entities.OrderDetail;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(target = "buyerId", source = "buyer.id")
    @Mapping(target = "orderDetails", source = "orderDetails", qualifiedByName = "orderDetailsDtoFromEntities")
    OrderDto toOrderDto(Order order);

    @Named("orderDetailDtoFromEntity")
    default OrderDetailDto orderDetailDtoFromEntity(OrderDetail orderDetail) {
        if (orderDetail == null)
            return null;
        OrderDetailDto dto = new OrderDetailDto();
        dto.setId(orderDetail.getId());
        dto.setOrderId(orderDetail.getOrder().getId());
        dto.setPlatformFee(orderDetail.getPlatformFee());
        dto.setSellerEarnings(orderDetail.getSellerEarnings());
        dto.setProductId(orderDetail.getProduct().getId());
        dto.setQuantity(orderDetail.getQuantity());
        dto.setSubtotal(orderDetail.getSubtotal());
        return dto;
    }

    @Named("orderDetailsDtoFromEntities")
    default List<OrderDetailDto> orderDetailsDtoFromEntities(List<OrderDetail> orderDetails) {
        if (orderDetails == null)
            return Collections.emptyList();
        List<OrderDetailDto> list = new ArrayList<>(orderDetails.size());
        for (OrderDetail od : orderDetails) {
            OrderDetailDto dto = orderDetailDtoFromEntity(od);
            if (dto != null) {
                list.add(dto);
            }
        }
        return list;
    }

}
