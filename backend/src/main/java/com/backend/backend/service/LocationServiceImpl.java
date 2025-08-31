package com.backend.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.entity.Location;
import com.backend.backend.repository.LocationRepository;

@Service
public class LocationServiceImpl implements LocationService{

    @Autowired
    private LocationRepository locationRepository;

    public Location addLocation(Location location){
        return locationRepository.save(location);
    }

    public List<Location> getAllLocations(){
        return locationRepository.findAll();
    }
}
