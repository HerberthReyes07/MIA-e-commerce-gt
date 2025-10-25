package com.archivos.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreditCardDto {

    private Long id;
    private String cardNumber;
    private String cardHolder;
    private String cvv;
    private String alias;
    private String expirationDate;
    private Long customerId;
}
