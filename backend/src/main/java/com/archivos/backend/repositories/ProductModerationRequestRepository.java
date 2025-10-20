package com.archivos.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.archivos.backend.dtos.PendingRequestViewDto;
import com.archivos.backend.entities.ProductModerationRequest;

public interface ProductModerationRequestRepository extends JpaRepository<ProductModerationRequest, Long> {
    
    List<ProductModerationRequest> findAllByModeratorId(Long moderatorId);

    @Query("""
        select new com.archivos.backend.dtos.PendingRequestViewDto(
            pmr.id,
            pmr.status,
            cast(pmr.requestDate as string),
            p.id,
            p.name,
            p.price,
            p.isNew,
            p.stock,
            u.id,
            concat(u.firstName, ' ', u.lastName),
            u.email
        )
        from ProductModerationRequest pmr
        join pmr.product p
        join p.owner u
        where pmr.moderator.id = :moderatorId
          and pmr.status = :status
        order by pmr.requestDate asc
        """)
    List<PendingRequestViewDto> findPendingRequestsView(
        @Param("moderatorId") Long moderatorId, 
        @Param("status") Integer status
    );

    @Query("""
        select pmr 
        from ProductModerationRequest pmr 
        where pmr.product.id = :productId 
        order by pmr.reviewDate desc nulls last, pmr.requestDate desc 
        limit 1
        """)
    Optional<ProductModerationRequest> findLatestByProductId(@Param("productId") Long productId);
}
