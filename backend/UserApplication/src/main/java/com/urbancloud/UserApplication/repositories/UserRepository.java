package com.urbancloud.UserApplication.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.urbancloud.UserApplication.models.UserDTO;


@Repository
public interface UserRepository extends JpaRepository<UserDTO, Long> {

	UserDTO findByEmailAndPassword(String email, String password);

	UserDTO findByEmail(String userEmail);

}
