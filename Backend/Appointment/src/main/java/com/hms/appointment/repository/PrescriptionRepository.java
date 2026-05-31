package com.hms.appointment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.hms.appointment.entity.Prescription;

public interface PrescriptionRepository extends CrudRepository<Prescription, Long> {

    // Method to find a prescription by appointment ID
    Optional<Prescription> findByAppointment_Id(Long appointmentId);

    // Method to find all prescriptions by patient ID
    List<Prescription> findAllByPatientId(Long patientId);

    @Query("Select p.id from Prescription p where p.patientId=?1")
    List<Long> findAllPreIdsByPatient(Long patientId);

}
