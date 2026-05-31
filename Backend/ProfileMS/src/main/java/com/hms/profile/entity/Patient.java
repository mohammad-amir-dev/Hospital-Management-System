package com.hms.profile.entity;

import java.time.LocalDate;

import org.springframework.stereotype.Indexed;

import com.hms.profile.dto.BloodGroup;
import com.hms.profile.dto.PatientDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true, nullable = true)
    private String email;
    private LocalDate dob;
    private Long profilePictureId;
    private String phone;
    private String address;
    @Column(unique = true, nullable = true)
    private String aadharNo;
    private BloodGroup bloodGroup;
    private String allergies;
    private String chronicDisease;

    public PatientDTO toDTO() {
        return new PatientDTO(this.id, this.name, this.email, this.dob, this.profilePictureId, this.phone, this.address,
                this.aadharNo,
                this.bloodGroup, this.allergies, this.chronicDisease);
    }

}
