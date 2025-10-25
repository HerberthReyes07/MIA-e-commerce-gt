package com.archivos.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.archivos.backend.dtos.ProductCatalogDto;
import com.archivos.backend.dtos.TopSellerInventoryDto;
import com.archivos.backend.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAllByOwnerId(Long ownerId);

    // Catálogo: devuelve productos aprobados (reviewStatus = 2).
    @Query("""
            select new com.archivos.backend.dtos.ProductCatalogDto(
                p.id,
                p.name,
                p.price,
                p.imageUrl,
                p.isNew
            )
            from Product p
            join p.owner o
            where p.reviewStatus = 2 and o.id != :currentCustomerId
            order by p.lastUpdatedDate desc, p.id desc
            """)
    List<ProductCatalogDto> findApprovedProducts(@Param("currentCustomerId") Long currentCustomerId);

    /**
     * Top 10 vendedores con más productos a la venta (aprobados).
     * Cuenta productos con reviewStatus = 2 y suma el stock total.
     */
    @Query("""
            select new com.archivos.backend.dtos.TopSellerInventoryDto(
                u.id,
                concat(u.firstName, ' ', u.lastName),
                u.email,
                cast(u.registrationDate as string),
                cast(count(p.id) as integer),
                cast(sum(p.stock) as integer)
            )
            from Product p
            join p.owner u
            where p.reviewStatus = 2
            group by u.id, u.firstName, u.lastName, u.email, u.registrationDate
            order by count(p.id) desc
            limit 10
            """)
    List<TopSellerInventoryDto> findTopSellersByInventory();

}
