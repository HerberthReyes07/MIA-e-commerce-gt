package com.archivos.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.archivos.backend.dtos.CreditCardDto;
import com.archivos.backend.mappers.CreditCardMapper;
import com.archivos.backend.repositories.CreditCardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CreditCardService {
    
    private final CreditCardRepository creditCardRepository;
    private final UserService userService;
    private final CreditCardMapper creditCardMapper;

    public List<CreditCardDto> getCreditCards() {
        Long userId = userService.getAuthUser().getId();
        return creditCardRepository.findByCustomerId(userId)
                .stream()
                .map(creditCardMapper::toCreditCardDto)
                .collect(Collectors.toList());
    }

    public CreditCardDto addCreditCard(CreditCardDto creditCardDto) {
        Long userId = userService.getAuthUser().getId();
        creditCardDto.setCustomerId(userId);
        return creditCardMapper.toCreditCardDto(
                creditCardRepository.save(
                        creditCardMapper.toCreditCard(creditCardDto)
                )
        );
    }

}
