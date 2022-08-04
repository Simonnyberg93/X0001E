package com.urbancloud.UserApplication.repositories;

import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.urbancloud.UserApplication.models.Area;
import com.urbancloud.UserApplication.models.UserDTO;

@Repository
public interface AreaRepository extends JpaRepository<Area, Long> {

	Area findByAreaName(String areaName);
	
	Set<Area> findByUser(UserDTO user);

	@Transactional
	void deleteAllByUser(UserDTO user);
}
