package com.hms.appointment.service;

import java.util.List;

import com.hms.appointment.dto.MedicineDTO;

public interface MedicineService {
    public Long saveMedicine(MedicineDTO request);

    public List<MedicineDTO> saveAllMedicines(List<MedicineDTO> requestList);

    public List<MedicineDTO> getAllMedicinesByPrescriptionId(Long prescriptionId);

    public List<MedicineDTO> getMedicinesByPrescriptionIds(List<Long> prescriptionIds);

}
