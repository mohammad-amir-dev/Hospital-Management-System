package com.hms.appointment.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.hms.appointment.entity.Medicine;

public interface MedicineRepository extends CrudRepository<Medicine, Long> {

    List<Medicine> findAllByPrescription_Id(Long prescriptionId);

    List<Medicine> findAllByPrescription_IdIn(List<Long> prescriptionIds);
}
