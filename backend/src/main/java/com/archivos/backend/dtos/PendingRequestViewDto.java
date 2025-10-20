package com.archivos.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO optimizado para la vista de solicitudes pendientes del moderador.
 * Incluye toda la información necesaria para mostrar en la tabla sin queries adicionales.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PendingRequestViewDto {
    
    // Datos de la solicitud
    private Long requestId;
    private Integer status;
    private String requestDate;
    
    // Datos del producto
    private Long productId;
    private String productName;
    private Double productPrice;
    private Boolean productIsNew;
    private Integer productStock;
    
    // Datos del dueño del producto
    private Long ownerId;
    private String ownerName;     // firstName + lastName
    private String ownerEmail;
}
