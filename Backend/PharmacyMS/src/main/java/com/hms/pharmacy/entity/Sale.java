package com.hms.pharmacy.entity;

import java.time.LocalDateTime;

import com.hms.pharmacy.dto.SaleDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Field Type Description
// id Long Primary Key
// prescriptionId Long FK Link to the prescription
// saleDate Timestamp Sale timestamp
// totalAmount Decimal Total amount for the sale
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long prescriptionId;
    private String buyerName;
    private String buyerContact;
    private LocalDateTime saleDate;
    private Double totalAmount;

    public Sale(Long id) {
        this.id = id;
    }

    public SaleDTO toDTO() {
        return new SaleDTO(id, prescriptionId, buyerName, buyerContact, saleDate, totalAmount);
    }

}
