package com.hms.pharmacy.entity;

import java.time.LocalDate;

import com.hms.pharmacy.dto.MedicineInventoryDTO;
import com.hms.pharmacy.dto.StockStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class MedicineInventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine; // Linked to Medicine entity
    private String batchNo; // Batch number of the medicine
    private Integer quantity; // Quantity in stock
    private LocalDate expiryDate; // Expiry date of the batch
    private LocalDate addedDate; // Date when the batch was added to inventory
    private Integer initialQuantity; // Initial quantity of the batch
    @Enumerated(EnumType.STRING)
    private StockStatus status;

    public MedicineInventoryDTO toDTO() {
        return new MedicineInventoryDTO(
                id,
                medicine != null ? medicine.getId() : null,
                batchNo,
                quantity,
                expiryDate,
                addedDate, initialQuantity, status);
    }
}
