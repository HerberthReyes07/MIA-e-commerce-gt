package com.archivos.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.archivos.backend.dtos.TopSellerSalesDto;
import com.archivos.backend.dtos.TopBuyerRevenueDto;
import com.archivos.backend.dtos.TopProductSalesDto;
import com.archivos.backend.entities.OrderDetail;

import java.time.LocalDate;
import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    /**
     * Reporte: Vendedores que más productos han vendido (ordenes confirmadas status
     * = 2).
     * Retorna toda la información esperada por TopSellerSalesDto.
     */
    @Query("""
            select new com.archivos.backend.dtos.TopSellerSalesDto(
            	u.id,
            	concat(u.firstName, ' ', u.lastName),
            	u.email,
            	cast(u.registrationDate as string),
            	cast(sum(od.quantity) as integer),
            	sum(od.subtotal)
            )
            from OrderDetail od
            join od.order o
            join od.product p
            join p.owner u
            where o.status = 2
              and o.orderDate >= :startDate
              and o.orderDate <= :endDate
            group by u.id, u.firstName, u.lastName, u.email, u.registrationDate
            order by sum(od.quantity) desc
            limit 5
            """)
    List<TopSellerSalesDto> findTopSellerSales(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /**
     * Reporte: Compradores que más ganancias de plataforma han generado (ordenes
     * confirmadas status = 2).
     * Suma platformFee por comprador y calcula el promedio por orden.
     */
    @Query("""
            select new com.archivos.backend.dtos.TopBuyerRevenueDto(
                b.id,
                concat(b.firstName, ' ', b.lastName),
                b.email,
                cast(count(distinct o.id) as integer),
                sum(od.platformFee),
                (sum(od.platformFee) / count(distinct o.id))
            )
            from OrderDetail od
            join od.order o
            join o.buyer b
            where o.status = 2
                and o.orderDate >= :startDate
                and o.orderDate <= :endDate
            group by b.id, b.firstName, b.lastName, b.email
            order by sum(od.platformFee) desc
            limit 5
            """)
    List<TopBuyerRevenueDto> findTopBuyerPlatformRevenue(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /**
     * Reporte: Productos más vendidos (órdenes confirmadas status = 2).
     * Devuelve toda la información esperada por TopProductSalesDto.
     */
    @Query("""
            select new com.archivos.backend.dtos.TopProductSalesDto(
                p.id,
                p.name,
                p.price,
                p.isNew,
                concat(u.firstName, ' ', u.lastName),
                u.email,
                cast(sum(od.quantity) as integer),
                sum(od.subtotal)
            )
            from OrderDetail od
            join od.order o
            join od.product p
            join p.owner u
            where o.status = 2
                and o.orderDate >= :startDate
                and o.orderDate <= :endDate
            group by p.id, p.name, p.price, p.isNew, u.firstName, u.lastName, u.email
            order by sum(od.quantity) desc
            limit 10
            """)
    List<TopProductSalesDto> findTopProductSales(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

}
