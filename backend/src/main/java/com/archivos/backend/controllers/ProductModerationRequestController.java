package com.archivos.backend.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.archivos.backend.dtos.PendingRequestViewDto;
import com.archivos.backend.dtos.ProductModerationRequestDto;
import com.archivos.backend.services.ProductModerationRequestService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ProductModerationRequestController {

    private final ProductModerationRequestService productModerationRequestService;

    @GetMapping("/products/moderation-requests/my-requests")
    public ResponseEntity<List<ProductModerationRequestDto>> getMyRequests() {
        List<ProductModerationRequestDto> requests = productModerationRequestService.getAllMyRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/products/moderation-requests/my-requests/pending")
    public ResponseEntity<List<PendingRequestViewDto>> getMyPendingRequests() {
        List<PendingRequestViewDto> requests = productModerationRequestService.getAllMyPendingRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/products/moderation-requests/{id}/latest")
    public ResponseEntity<ProductModerationRequestDto> getLatestRequestByProductId(@PathVariable("id") Long id) {
        ProductModerationRequestDto request = productModerationRequestService.getLatestRequestForProduct(id);
        return ResponseEntity.ok(request);
    }

    @PutMapping("/products/moderation-requests/{id}")
    public ResponseEntity<ProductModerationRequestDto> updateModerationRequest(
            @PathVariable("id") Long id,
            @RequestBody ProductModerationRequestDto dto) {
        ProductModerationRequestDto updatedRequest = productModerationRequestService.updateModerationRequest(id, dto);
        return ResponseEntity.ok(updatedRequest);
    }
}
