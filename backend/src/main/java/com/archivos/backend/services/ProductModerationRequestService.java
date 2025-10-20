package com.archivos.backend.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.archivos.backend.dtos.PendingRequestViewDto;
import com.archivos.backend.dtos.ProductModerationRequestDto;
import com.archivos.backend.dtos.UserDto;
import com.archivos.backend.entities.Product;
import com.archivos.backend.entities.ProductModerationRequest;
import com.archivos.backend.mappers.ProductModerationRequestMapper;
import com.archivos.backend.repositories.ProductModerationRequestRepository;
import com.archivos.backend.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductModerationRequestService {

    private final ProductModerationRequestRepository productModerationRequestRepository;
    private final ProductModerationRequestMapper productModerationRequestMapper;
    private final UserService userService;
    private final ProductRepository productRepository;

    public ProductModerationRequestDto createModerationRequest(ProductModerationRequestDto dto) {

        UserDto moderator = userService.getModeratorWithLeastPendingRequests();
        dto.setModeratorId(moderator.getId());

        ProductModerationRequest pmr = productModerationRequestMapper.toProductModerationRequest(dto);
        ProductModerationRequest savedpmr = productModerationRequestRepository.save(pmr);
        return productModerationRequestMapper.toProductModerationRequestDto(savedpmr);
    }

    public ProductModerationRequestDto updateModerationRequest(Long id, ProductModerationRequestDto dto) {

        ProductModerationRequest pmr = productModerationRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitud de moderación de producto no encontrada"));

        productModerationRequestMapper.updateProductModerationRequestFromDto(dto, pmr);
        pmr.setReviewDate(LocalDate.now());
        ProductModerationRequest updatedpmr = productModerationRequestRepository.save(pmr);

        // Actualiza el estado del producto asociado
        Product product = updatedpmr.getProduct();
        product.setReviewStatus(updatedpmr.getStatus());
        productRepository.save(product);

        return productModerationRequestMapper.toProductModerationRequestDto(updatedpmr);
    }

    public List<ProductModerationRequestDto> getAllMyRequests() {

        UserDto moderator = userService.getAuthUser();

        List<ProductModerationRequest> requests = productModerationRequestRepository
                .findAllByModeratorId(moderator.getId());
        return requests.stream()
                .map(productModerationRequestMapper::toProductModerationRequestDto)
                .toList();
    }

    public List<PendingRequestViewDto> getAllMyPendingRequests() {

        UserDto moderator = userService.getAuthUser();

        List<PendingRequestViewDto> requests = productModerationRequestRepository
                .findPendingRequestsView(moderator.getId(), 1);
        return requests;
    }

    public ProductModerationRequestDto getLatestRequestForProduct(Long productId) {
        ProductModerationRequest pmr = productModerationRequestRepository.findLatestByProductId(productId)
                .orElseThrow(
                        () -> new RuntimeException("No se encontró ninguna solicitud de moderación para el producto"));
        return productModerationRequestMapper.toProductModerationRequestDto(pmr);
    }

}
