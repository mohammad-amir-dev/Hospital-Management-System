package com.hms.user.entity;

import java.time.LocalDateTime;

import org.springframework.stereotype.Indexed;

import com.hms.user.dto.Roles;
import com.hms.user.dto.UserDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true)
    private String email;
    private String password;
    private Roles role;
    private Long profileId;
    @Column(updatable = false)
    private LocalDateTime createdAt;
    // @Column(nullable = false)
    private LocalDateTime updatedAt;

    public UserDTO toDTO() {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(this.id);
        userDTO.setName(this.name);
        userDTO.setEmail(this.email);
        userDTO.setPassword(this.password);
        userDTO.setRole(this.role);
        userDTO.setProfileId(this.profileId);
        userDTO.setCreatedAt(this.createdAt);
        userDTO.setUpdatedAt(this.updatedAt);
        return userDTO;
    }

    @PrePersist
    protected void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    protected void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
