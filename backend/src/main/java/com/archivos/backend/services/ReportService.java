package com.archivos.backend.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.archivos.backend.dtos.TopBuyerOrdersDto;
import com.archivos.backend.dtos.TopBuyerRevenueDto;
import com.archivos.backend.dtos.TopProductSalesDto;
import com.archivos.backend.dtos.TopSellerInventoryDto;
import com.archivos.backend.dtos.TopSellerSalesDto;
import com.archivos.backend.repositories.OrderDetailRepository;
import com.archivos.backend.repositories.OrderRepository;
import com.archivos.backend.repositories.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final OrderDetailRepository orderDetailRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public List<TopProductSalesDto> getTopProductsSales(LocalDate startDate, LocalDate endDate) {
        if (startDate == null) {
            startDate = LocalDate.of(2000, 1, 1); // Fecha muy antigua
        }
        if (endDate == null) {
            endDate = LocalDate.now();
        }
        return orderDetailRepository.findTopProductSales(startDate, endDate);
    }

    public List<TopBuyerRevenueDto> getTopBuyersPlatformRevenue(LocalDate startDate, LocalDate endDate) {
        if (startDate == null) {
            startDate = LocalDate.of(2000, 1, 1); // Fecha muy antigua
        }
        if (endDate == null) {
            endDate = LocalDate.now();
        }
        return orderDetailRepository.findTopBuyerPlatformRevenue(startDate, endDate);
    }

    public List<TopSellerSalesDto> getTopSellersSales(LocalDate startDate, LocalDate endDate) {
        if (startDate == null) {
            startDate = LocalDate.of(2000, 1, 1); // Fecha muy antigua
        }
        if (endDate == null) {
            endDate = LocalDate.now();
        }
        return orderDetailRepository.findTopSellerSales(startDate, endDate);
    }

    public List<TopBuyerOrdersDto> getTopBuyersByOrders(LocalDate startDate, LocalDate endDate) {
        if (startDate == null) {
            startDate = LocalDate.of(2000, 1, 1); // Fecha muy antigua
        }
        if (endDate == null) {
            endDate = LocalDate.now();
        }
        return orderRepository.findTopBuyersByOrders(startDate, endDate);
    }

    public List<TopSellerInventoryDto> getTopSellersByInventory() {
        return productRepository.findTopSellersByInventory();
    }

}
