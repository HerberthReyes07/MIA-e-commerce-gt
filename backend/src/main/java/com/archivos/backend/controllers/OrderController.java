package com.archivos.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.archivos.backend.dtos.CreditCardDto;
import com.archivos.backend.dtos.OrderDto;
import com.archivos.backend.services.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/orders/place-order")
    public ResponseEntity<OrderDto> createOrder(@RequestBody(required = false) CreditCardDto creditCardDto) {
        OrderDto orderDto = orderService.createOrder(creditCardDto);
        return ResponseEntity.ok(orderDto);
    }

}
