package com.hms.user.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hms.user.dto.UserDTO;
import com.hms.user.exception.HmsException;
import com.hms.user.service.UserService;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            UserDTO dto = userService.getUser(email);
            return new CustomUserDetails(dto.getId(), dto.getEmail(), dto.getEmail(), dto.getPassword(), dto.getRole(),
                    dto.getName(), dto.getProfileId(), null);
        } catch (HmsException e) {
            e.printStackTrace();
        }
        return null;
    }

}
