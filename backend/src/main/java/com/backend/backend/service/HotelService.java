package com.backend.backend.service;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.backend.backend.entity.Hotel;

public interface HotelService {
    public Hotel addHotel(MultipartFile file, Hotel hotel) throws IOException;
    public List<Hotel> findHotelsByCityName(String cityName);
    public Page<Hotel> getAllHotels(Pageable pageable);
    public Hotel getHotelById(long hotelId);
    public Page<Hotel> searchHotel(String value, Pageable pageable);
    
}
