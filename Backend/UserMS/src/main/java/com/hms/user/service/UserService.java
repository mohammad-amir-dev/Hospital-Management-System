package com.hms.user.service;

import com.hms.user.clients.Profile;
import com.hms.user.dto.RegistrationCountsDTO;
import com.hms.user.dto.UserDTO;
import com.hms.user.exception.HmsException;

public interface UserService {
    public void registerUser(UserDTO userDTO) throws HmsException;

    public UserDTO loginUser(UserDTO userDTO) throws HmsException;

    public UserDTO getUserById(Long id) throws HmsException;

    public void updateUser(UserDTO userDTO);

    public UserDTO getUser(String email) throws HmsException;

    public Long getProfile(Long id) throws HmsException;

    RegistrationCountsDTO getMonthlyRegistrationCounts();

}
