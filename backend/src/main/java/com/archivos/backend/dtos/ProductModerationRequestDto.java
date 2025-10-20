package com.archivos.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductModerationRequestDto {
    
    private Long id;
    private Long productId;
    private Long moderatorId;
    private Integer status;
    private String rejectionReason;
    private String requestDate;
    private String reviewDate;
}
