package com.hms.pharmacy.dto;

import java.time.LocalDate;

import com.hms.pharmacy.entity.Medicine;
import com.hms.pharmacy.entity.MedicineInventory;

import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicineInventoryDTO {
    private Long id;
    private Long medicineId;
    private String batchNo;
    private Integer quantity;
    private LocalDate expiryDate;
    private LocalDate addedDate;
    private Integer initialQuantity; // Initial quantity of the batch
    private StockStatus status;

    public MedicineInventory toEntity() {
        return new MedicineInventory(id,
                new Medicine(medicineId),
                batchNo,
                quantity,
                expiryDate,
                addedDate, initialQuantity, status);
    }
}
