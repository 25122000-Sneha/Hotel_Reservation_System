package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.backend.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Long>{
    
}
