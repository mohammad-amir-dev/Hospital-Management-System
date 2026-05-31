package com.hms.pharmacy.dto;

import java.time.LocalDateTime;

import com.hms.pharmacy.entity.Medicine;
import com.hms.pharmacy.entity.MedicineCategory;
import com.hms.pharmacy.entity.MedicineType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicineDTO {
    private Long id;
    private String name;
    private String dosage;
    private MedicineCategory category;
    private MedicineType type;
    private String manufacturer;
    private Integer unitPrice;
    private Integer stock; // Current stock quantity
    private LocalDateTime createdAt;

    public Medicine toEntity() {
        return new Medicine(id, name, dosage, category, type, manufacturer, unitPrice, stock, createdAt);
    }
}
