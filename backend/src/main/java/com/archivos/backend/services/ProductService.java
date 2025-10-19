package com.archivos.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;
import java.util.List;
import com.archivos.backend.dtos.ProductDto;
import com.archivos.backend.dtos.UserDto;
import com.archivos.backend.entities.Product;
import com.archivos.backend.mappers.ProductMapper;
import com.archivos.backend.repositories.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final UserService userService;
    private final ProductMapper productMapper;
    private final ImageService imageService;

    public ProductDto createProduct(ProductDto productDto, MultipartFile image) {

        UserDto user = userService.getAuthUser();
        productDto.setOwnerId(user.getId());

        Product product = productMapper.toProduct(productDto);
        product.setLastUpdatedDate(LocalDate.now());

        if (image != null && !image.isEmpty()) {
            String imageUrl = imageService.saveImage(image);
            product.setImageUrl(imageUrl);
        }

        Product savedProduct = productRepository.save(product);
        return productMapper.toProductDto(savedProduct);
    }

    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(productMapper::toProductDto)
                .toList();
    }

    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        return productMapper.toProductDto(product);
    }

    public ProductDto updateProduct(Long id, ProductDto productDto, MultipartFile image) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        productMapper.updateProductFromDto(productDto, product);
        product.setLastUpdatedDate(LocalDate.now());

        if (image != null && !image.isEmpty()) {
            imageService.deleteImage(product.getImageUrl());
            String imageUrl = imageService.saveImage(image);
            product.setImageUrl(imageUrl);
        }

        Product updatedProduct = productRepository.save(product);
        return productMapper.toProductDto(updatedProduct);
    }

    public List<ProductDto> getMyProducts() {
        UserDto user = userService.getAuthUser();

        List<Product> products = productRepository.findAllByOwnerId(user.getId());
        return products.stream()
                .map(productMapper::toProductDto)
                .toList();
    }

}
