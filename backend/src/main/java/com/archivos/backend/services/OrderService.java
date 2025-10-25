package com.archivos.backend.services;

import java.time.LocalDate;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.archivos.backend.dtos.CreditCardDto;
import com.archivos.backend.dtos.OrderDto;
import com.archivos.backend.dtos.UserDto;
import com.archivos.backend.entities.Cart;
import com.archivos.backend.entities.Order;
import com.archivos.backend.entities.OrderDetail;
import com.archivos.backend.entities.Product;
import com.archivos.backend.exceptions.AppException;
import com.archivos.backend.mappers.OrderMapper;
import com.archivos.backend.mappers.UserMapper;
import com.archivos.backend.repositories.CartRepository;
import com.archivos.backend.repositories.OrderDetailRepository;
import com.archivos.backend.repositories.OrderRepository;
import com.archivos.backend.repositories.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final CreditCardService creditCardService;
    private final UserService userService;
    private final UserMapper userMapper;
    private final OrderMapper orderMapper;

    public OrderDto createOrder(CreditCardDto creditCardDto) {

        // Guardar la información de la tarjeta de crédito utilizando CreditCardService
        if (creditCardDto != null) {
            creditCardService.addCreditCard(creditCardDto);
        }

        UserDto customer = userService.getAuthUser();

        Cart cart = cartRepository.findActiveCart(customer.getId())
                .orElseThrow(() -> new AppException("Carrito no encontrado",
                        HttpStatus.NOT_FOUND));

        // Crear orden
        Order order = orderRepository.save(
                Order.builder()
                        .orderDate(LocalDate.now())
                        .deliveryDate(LocalDate.now().plusDays(5))
                        .status(1) // Estado inicial
                        .totalAmount(0.0) // Calcular el total según los items del carrito
                        .buyer(userMapper.toUser(customer))
                        .build());

        for (var item : cart.getItems()) {
            // Agregar detalles de la orden según los items del carrito
            Product product = item.getProduct();

            if (item.getQuantity() > product.getStock()) {
                order.setStatus(3);// Orden cancelada
                orderRepository.save(order);
                throw new AppException("Stock insuficiente para el producto: " +
                        product.getName(),
                        HttpStatus.BAD_REQUEST);
            }

            // Actualizar stock del producto
            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);

            // Crear OrderDetail y agregarlo a la orden
            Double subtotal = product.getPrice() * item.getQuantity();
            OrderDetail orderDetail = OrderDetail.builder()
                    .order(order)
                    .product(product)
                    .quantity(item.getQuantity())
                    .subtotal(subtotal)
                    .platformFee(subtotal * 0.05) // 5% para la plataforma
                    .sellerEarnings(subtotal * 0.95) // 95% para el vendedor
                    .build();
            orderDetailRepository.save(orderDetail);
            order.addOrderDetail(orderDetail);

            // Actualizar el total de la orden
            order.setTotalAmount(order.getTotalAmount() + subtotal);
        }

        order.setStatus(2);// Orden confirmada
        orderRepository.save(order);

        //cart.setItems(null);
        cart.setIsActive(false);
        cartRepository.save(cart);

        return orderMapper.toOrderDto(order);

        /*
         * return orderMapper.toOrderDto(Order.builder()
         * .orderDate(LocalDate.now())
         * .deliveryDate(LocalDate.now().plusDays(5))
         * .status(1) // Estado inicial
         * .totalAmount(0.0) // Calcular el total según los items del carrito
         * .buyer(userMapper.toUser(customer))
         * .build());
         */
    }

}
