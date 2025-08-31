package com.backend.backend.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.backend.backend.entity.Hotel;

public interface HotelService {
    public Hotel addHotel(MultipartFile file, Hotel hotel) throws IOException;
    public List<Hotel> findHotelsByCityName(String cityName);
    public List<Hotel> getAllHotels();
    public Hotel getHotelById(long hotelId);
    public List<Hotel> searchHotel(String value);
    
}
