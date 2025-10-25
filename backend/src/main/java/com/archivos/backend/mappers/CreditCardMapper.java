package com.archivos.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.archivos.backend.dtos.CreditCardDto;
import com.archivos.backend.entities.CreditCard;
import com.archivos.backend.entities.User;

@Mapper(componentModel = "spring")
public interface CreditCardMapper {

    @Mapping(target = "customerId", source = "customer.id")
    CreditCardDto toCreditCardDto(CreditCard creditCard);

    @Mapping(target = "customer", source = "customerId", qualifiedByName = "mapCustomerIdToUser")
    @Mapping(target = "id", ignore = true)
    CreditCard toCreditCard(CreditCardDto creditCardDto);

    @Named("mapCustomerIdToUser")
    default User mapCustomerIdToUser(Long customerId) {
        if (customerId == null) {
            return null;
        }
        User user = new User();
        user.setId(customerId);
        return user;
    }

}
