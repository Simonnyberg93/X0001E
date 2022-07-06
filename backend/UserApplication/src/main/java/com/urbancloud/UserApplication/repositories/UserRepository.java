package com.urbancloud.UserApplication.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.urbancloud.UserApplication.models.UserDTO;


@Repository
public interface UserRepository extends JpaRepository<UserDTO, Long> {

	Optional<UserDTO> findByEmailAndPassword(String email, String password);

	Optional<UserDTO> findByEmail(String userEmail);

}
