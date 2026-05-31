package com.hms.pharmacy.api;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.pharmacy.dto.MedicineInventoryDTO;
import com.hms.pharmacy.exception.HmsException;
import com.hms.pharmacy.service.MedicineInventoryService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequestMapping("/pharmacy/inventory")
@RequiredArgsConstructor
public class MedicineInventoryAPI {

    private final MedicineInventoryService medicineInventoryService;

    @PostMapping("/add")
    public ResponseEntity<MedicineInventoryDTO> addMedicine(@RequestBody MedicineInventoryDTO medicineDTO)
            throws HmsException {
        return new ResponseEntity<>(medicineInventoryService.addMedicine(medicineDTO), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<MedicineInventoryDTO> updateMedicine(@RequestBody MedicineInventoryDTO medicineDTO)
            throws HmsException {
        return new ResponseEntity<>(medicineInventoryService.updateMedicine(medicineDTO), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<MedicineInventoryDTO> getMedicineById(@PathVariable Long id) throws HmsException {
        return new ResponseEntity<>(medicineInventoryService.getMedicineById(id), HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<MedicineInventoryDTO>> getAllMedicines() throws HmsException {
        return new ResponseEntity<>(medicineInventoryService.getAllMedicines(), HttpStatus.OK);
    }

}

// table id , count
// table medicine

// Problem :
/*
 * MedicineCount -> medicineId, count;
 * MedicineInventory -> medicineId, batchNo, quantity 234, expiryDate,
 * addedDate;
 * 5 qty sell -> medicineCount -5
 * 
 */