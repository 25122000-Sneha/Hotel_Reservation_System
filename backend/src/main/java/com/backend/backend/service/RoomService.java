package com.backend.backend.service;

import java.util.List;

import com.backend.backend.entity.Room;

public interface RoomService {
    public List<Room> getAllRoomsByHotel(Long hotelId);
    public Room addRoom(Room room, Long hotelId);
    public double getPriceByRoomId(Long id);
}
