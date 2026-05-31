package com.hms.pharmacy.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.hms.pharmacy.dto.StockStatus;
import com.hms.pharmacy.entity.MedicineInventory;

public interface MedicineInventoryRepository extends CrudRepository<MedicineInventory, Long> {

    List<MedicineInventory> findByExpiryDateBeforeAndStatus(LocalDate date, StockStatus status);
    // medicineId and expiryDate>now and quantity>0 top 1 asc by expiryDate

    // select * from medicine_inventory where medicine_id = ? and expiry_date >
    // now() and quantity > 0 order by expiry_date asc limit 1
    List<MedicineInventory> findByMedicineIdAndExpiryDateAfterAndQuantityGreaterThanAndStatusOrderByExpiryDateAsc(
            Long medicineId,
            LocalDate date, Integer quantity, StockStatus status);
}
