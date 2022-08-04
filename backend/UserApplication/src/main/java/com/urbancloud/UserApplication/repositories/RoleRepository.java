package com.urbancloud.UserApplication.repositories;

import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.urbancloud.UserApplication.models.Role;
import com.urbancloud.UserApplication.models.UserDTO;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	
	Role findByRoleName(String roleName);
	
	Set<Role> findByUser(UserDTO user);
	
	@Transactional
	void deleteAllByUser(UserDTO user);
}
