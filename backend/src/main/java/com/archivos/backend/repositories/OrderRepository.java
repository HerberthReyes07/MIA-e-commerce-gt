package com.archivos.backend.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.archivos.backend.dtos.TopBuyerOrdersDto;
import com.archivos.backend.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

    /**
     * Top 10 compradores que más pedidos han realizado en un intervalo.
     * Solo cuenta órdenes confirmadas (status = 2).
     */
    @Query("""
            select new com.archivos.backend.dtos.TopBuyerOrdersDto(
                u.id,
                concat(u.firstName, ' ', u.lastName),
                u.email,
                cast(u.registrationDate as string),
                cast(count(o.id) as integer),
                sum(o.totalAmount)
            )
            from Order o
            join o.buyer u
            where o.status = 2
              and o.orderDate >= :startDate
              and o.orderDate <= :endDate
            group by u.id, u.firstName, u.lastName, u.email, u.registrationDate
            order by count(o.id) desc
            limit 10
            """)
    List<TopBuyerOrdersDto> findTopBuyersByOrders(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
}
