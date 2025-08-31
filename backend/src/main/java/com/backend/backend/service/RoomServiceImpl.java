package com.backend.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.entity.Hotel;
import com.backend.backend.entity.Room;
import com.backend.backend.repository.HotelRepository;
import com.backend.backend.repository.RoomRepository;

@Service
public class RoomServiceImpl implements RoomService{

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HotelRepository hotelRepository;
    
    public List<Room> getAllRoomsByHotel(Long hotelId){
     List<Room> roomList = roomRepository.findRoomsByHotelId(hotelId);
     return roomList;
   }


   public Room addRoom(Room room, Long hotelId){
     Optional<Hotel> optionalHotel = hotelRepository.findById(hotelId);
     if(optionalHotel.isPresent()){
          Hotel hotel = optionalHotel.get();
          room.setHotel(hotel);
          return roomRepository.save(room);
     }
     else{
          return null;
     }
     
   }


   @Override
   public double getPriceByRoomId(Long id) {
     Optional<Room> optionalRoom = roomRepository.findByRoomId(id);
     if(optionalRoom.isPresent()){
      return optionalRoom.get().getRate();
     }
     else
     return 0.0;
   }
}
