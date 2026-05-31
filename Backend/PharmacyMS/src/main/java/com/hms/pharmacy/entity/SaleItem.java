package com.hms.pharmacy.entity;

import com.hms.pharmacy.dto.SaleItemDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// id Long Primary Key
// saleId Long (FK) Link to PharmacySale
// medicineId Long (FK) Medicine being sold
// batchNo String From inventory
// quantity Integer Quantity sold
// unitPrice Decimal Price at the time of sale
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class SaleItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sale_id", nullable = false)
    private Sale sale;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;
    private String batchNo;
    private Integer quantity;
    private Double unitPrice;

    public SaleItemDTO toDTO() {
        return new SaleItemDTO(id, sale != null ? sale.getId() : null, medicine != null ? medicine.getId() : null,
                batchNo, quantity, unitPrice);
    }
}
