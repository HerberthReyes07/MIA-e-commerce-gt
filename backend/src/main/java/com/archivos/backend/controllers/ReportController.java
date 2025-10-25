package com.archivos.backend.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.archivos.backend.dtos.TopBuyerOrdersDto;
import com.archivos.backend.dtos.TopBuyerRevenueDto;
import com.archivos.backend.dtos.TopProductSalesDto;
import com.archivos.backend.dtos.TopSellerInventoryDto;
import com.archivos.backend.dtos.TopSellerSalesDto;
import com.archivos.backend.services.ReportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/reports/top-products-sales")
    public ResponseEntity<List<TopProductSalesDto>> getTopProductsSales(
            @RequestParam(value = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(value = "endDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<TopProductSalesDto> response = reportService.getTopProductsSales(startDate, endDate);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/reports/top-buyers-revenue")
    public ResponseEntity<List<TopBuyerRevenueDto>> getTopBuyersPlatformRevenue(
            @RequestParam(value = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(value = "endDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<TopBuyerRevenueDto> response = reportService.getTopBuyersPlatformRevenue(startDate, endDate);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/reports/top-sellers-sales")
    public ResponseEntity<List<TopSellerSalesDto>> getTopSellersSales(
            @RequestParam(value = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(value = "endDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<TopSellerSalesDto> response = reportService.getTopSellersSales(startDate, endDate);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/reports/top-buyers-orders")
    public ResponseEntity<List<TopBuyerOrdersDto>> getTopBuyersByOrders(
            @RequestParam(value = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(value = "endDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<TopBuyerOrdersDto> response = reportService.getTopBuyersByOrders(startDate, endDate);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/reports/top-sellers-inventory")
    public ResponseEntity<List<TopSellerInventoryDto>> getTopSellersByInventory() {
        List<TopSellerInventoryDto> response = reportService.getTopSellersByInventory();
        return ResponseEntity.ok(response);
    }
}
