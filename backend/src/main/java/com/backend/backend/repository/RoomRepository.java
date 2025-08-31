package com.backend.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.backend.entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long>{

    @Query("SELECT R from Room R where R.hotel.hotelId = :hotelId")
    public List<Room> findRoomsByHotelId(Long hotelId);

    public Optional<Room> findByRoomId(Long id);

    
}
