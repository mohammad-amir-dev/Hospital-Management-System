package com.hms.profile.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.profile.dto.DoctorDTO;
import com.hms.profile.dto.DoctorDropdown;
import com.hms.profile.entity.Doctor;
import com.hms.profile.exception.HmsException;
import com.hms.profile.repository.DoctorRepository;

import jakarta.validation.constraints.Null;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public Long addDoctor(DoctorDTO doctorDTO) throws HmsException {
        if (doctorDTO.getEmail() != null && doctorRepository.findByEmail(doctorDTO.getEmail()).isPresent())
            throw new HmsException("DOCTOR_ALREADY_EXISTS");
        if (doctorDTO.getLicenseNo() != null && doctorRepository.findByLicenseNo(doctorDTO.getLicenseNo()).isPresent())
            throw new HmsException("DOCTOR_ALREADY_EXISTS");
        return doctorRepository.save(doctorDTO.toEntity()).getId();
    }

    @Override
    public DoctorDTO getDoctorById(Long id) throws HmsException {
        return doctorRepository.findById(id).orElseThrow(() -> new HmsException("DOCTOR_NOT_FOUND")).toDTO();
    }

    @Override
    public DoctorDTO updateDoctor(DoctorDTO doctorDTO) throws HmsException {
        doctorRepository.findById(doctorDTO.getId()).orElseThrow(() -> new HmsException("DOCTOR_NOT_FOUND"));
        return doctorRepository.save(doctorDTO.toEntity()).toDTO();
    }

    @Override
    public Boolean doctorExists(Long id) throws HmsException {
        return doctorRepository.existsById(id);
    }

    @Override
    public List<DoctorDropdown> getDoctorDropdowns() throws HmsException {
        return doctorRepository.findAllDoctorDropdowns();
    }

    public List<DoctorDropdown> getDoctorsById(List<Long> ids) throws HmsException {
        return doctorRepository.findAllDoctorDropdownsByIds(ids);
    }

    @Override
    public List<DoctorDTO> getAllDoctors() throws HmsException {
        return ((List<Doctor>) doctorRepository.findAll()).stream().map(doctor -> doctor.toDTO()).toList();
    }
}
