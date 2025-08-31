package com.backend.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.backend.entity.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long>{
    

    @Query("SELECT H from Hotel H where H.location.city = :cityName")
    public List<Hotel> findHotelsByCityName(String cityName);


    @Query("SELECT H from Hotel H where lower(H.location.city) like lower(concat('%', :value, '%')) or lower(H.location.state) like lower(concat('%', :value, '%')) or lower(H.hotelName) like lower(concat('%', :value, '%'))")
    public List<Hotel> searchHotel(String value);
}
