package com.hms.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.user.dto.MonthlyRoleCountDTO;
import com.hms.user.dto.Roles;
import com.hms.user.entity.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("Select new com.hms.user.dto.MonthlyRoleCountDTO( CAST(FUNCTION('MONTHNAME', a.createdAt) as String) , COUNT(a)) FROM User a WHERE a.role = ?1 AND YEAR(a.createdAt) = YEAR(CURRENT_DATE) GROUP BY FUNCTION('MONTH', a.createdAt), CAST(FUNCTION('MONTHNAME', a.createdAt) as String) ORDER BY FUNCTION('MONTH', a.createdAt)")
    List<MonthlyRoleCountDTO> countRegistrationsByRoleGroupedByMonth(Roles role);
}
