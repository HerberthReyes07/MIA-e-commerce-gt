package com.archivos.backend.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.archivos.backend.dtos.CreditCardDto;
import com.archivos.backend.services.CreditCardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CreditCardController {

    private final CreditCardService creditCardService;

    @GetMapping("/credit-cards")
    public ResponseEntity<List<CreditCardDto>> getCreditCards() {

        List<CreditCardDto> creditCards = creditCardService.getCreditCards();
        return ResponseEntity.ok(creditCards);
    }

    @PostMapping("/credit-cards")
    public ResponseEntity<CreditCardDto> addCreditCard(@RequestBody CreditCardDto creditCardDto) {
        CreditCardDto savedCreditCard = creditCardService.addCreditCard(creditCardDto);
        return ResponseEntity.ok(savedCreditCard);
    }

}
