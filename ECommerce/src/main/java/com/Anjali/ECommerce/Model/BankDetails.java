package com.Anjali.ECommerce.Model;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor

@Data
public class BankDetails {

    private String accountNumber;

    private String accountHolderName;

    private String ifscCode;

}
