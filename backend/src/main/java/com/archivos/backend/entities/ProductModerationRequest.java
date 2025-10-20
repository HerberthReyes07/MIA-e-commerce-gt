package com.archivos.backend.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "product_moderation_requests")
public class ProductModerationRequest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer status; // 1: Pendiente, 2: Aprobado, 3: Rechazado

    @Column(nullable = true, columnDefinition = "TEXT")
    private String rejectionReason;

    @Column(name = "request_date", nullable = false)
    private LocalDate requestDate;

    @Column(name = "review_date", nullable = true)
    private LocalDate reviewDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "moderator_id", nullable = false)
    private User moderator;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @PrePersist
    protected void onCreate() {

        if (status == null) {
            status = 1; // Pendiente de revisión
        }

        if (requestDate == null) {
            requestDate = LocalDate.now();
        }
    }
}
