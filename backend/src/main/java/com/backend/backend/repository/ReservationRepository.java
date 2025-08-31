package com.backend.backend.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.backend.entity.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long>{

    @Query("SELECT COUNT(r) from Reservation r where r.room.roomId = :selectedRoomId and (:checkIn < r.checkOutDate and :checkOut > r.checkInDate)")
    public Integer roomAlreadyBooked(@Param("selectedRoomId") Long selectedRoomId, @Param("checkIn") Date checkIn, @Param("checkOut") Date checkOut);
    

    
}
