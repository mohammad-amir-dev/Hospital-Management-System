package com.hms.pharmacy.entity;

import java.time.LocalDateTime;

import org.springframework.context.annotation.Description;

import com.hms.pharmacy.dto.MedicineDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String dosage; // e.g., 500mg, 5ml
    private MedicineCategory category; // E.g., ANTIBIOTIC, ANALGESIC
    private MedicineType type; // E.g., TABLET, SYRUP
    private String manufacturer;
    private Integer unitPrice;
    private Integer stock; // Current stock quantity
    private LocalDateTime createdAt; // Timestamp for record creation

    public Medicine(Long id) {
        this.id = id;
    }

    public MedicineDTO toDTO() {
        return new MedicineDTO(id, name, dosage, category, type, manufacturer, unitPrice, stock, createdAt);
    }

}

// Field Type Description
// id Long Primary Key
// name String Medicine name
// category Enum E.g., ANTIBIOTIC, ANALGESIC
// type Enum E.g., TABLET, SYRUP
// manufacturer String Manufacturer name
// unitPrice Decimal Price per unit
// createdAt Timestamp Record creation date
// dosage String e.g., 500mg, 5
