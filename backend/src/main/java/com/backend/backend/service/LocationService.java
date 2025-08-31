package com.backend.backend.service;

import java.util.List;

import com.backend.backend.entity.Location;

public interface LocationService {
    public Location addLocation(Location location);
    public List<Location> getAllLocations();
}
