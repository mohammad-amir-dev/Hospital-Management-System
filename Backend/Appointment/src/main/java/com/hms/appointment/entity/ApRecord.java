package com.hms.appointment.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.hms.appointment.dto.ApRecordDTO;
import com.hms.appointment.dto.RecordDetails;
import com.hms.appointment.utility.StringListConverter;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ApRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long patientId;
    private Long doctorId;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;
    private String symptoms;
    private String diagnosis;
    private String tests;
    private String notes;
    private String referral;
    private LocalDate followUpDate;
    private LocalDateTime createdAt;

    public ApRecordDTO toDTO() {
        return new ApRecordDTO(id, patientId, doctorId, appointment.getId(),
                StringListConverter.convertStringToList(symptoms), diagnosis,
                StringListConverter.convertStringToList(tests), notes, referral, null, followUpDate, createdAt);
    }

    public RecordDetails toRecordDetails() {
        return new RecordDetails(id, patientId, doctorId, null, appointment.getId(),
                StringListConverter.convertStringToList(symptoms), diagnosis,
                StringListConverter.convertStringToList(tests), notes, referral, followUpDate, createdAt);
    }
}
