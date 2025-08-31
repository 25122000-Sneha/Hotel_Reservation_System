package com.backend.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.entity.Reservation;
import com.backend.backend.entity.Room;
import com.backend.backend.entity.User;
import com.backend.backend.exceptions.ConflictingBookingException;
import com.backend.backend.exceptions.ResourceNotFoundException;
import com.backend.backend.repository.ReservationRepository;
import com.backend.backend.repository.RoomRepository;
import com.backend.backend.repository.UserRepository;

@Service
public class ReservationServiceImpl implements ReservationService{

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    public void addReservation(Reservation reservation){
        Optional<User> optionalUser = userRepository.findById(reservation.getUser().getUserId());
        Optional<Room> optionalRoom = roomRepository.findById(reservation.getRoom().getRoomId());
        
        if(!optionalUser.isPresent()){
            throw new ResourceNotFoundException("User not found");
        }
        else if(!optionalRoom.isPresent()){
            throw new ResourceNotFoundException("Room not found");
        }
        else{
            reservation.setUser(optionalUser.get());
            reservation.setRoom(optionalRoom.get());
            //Reservation conflictingBooking = reservationRepository.roomAlreadyBooked(reservation.getRoom().getRoomId(), reservation.getCheckInDate(), reservation.getCheckOutDate());
            Integer noOfConflictingBooking = reservationRepository.roomAlreadyBooked(reservation.getRoom().getRoomId(), reservation.getCheckInDate(), reservation.getCheckOutDate());
            // if(conflictingBooking != null){
            //     throw new ConflictingBookingException("Room is already booked  for the selected datees");
            // }
            // else{
            //     return reservationRepository.save(reservation);
            // }

            if(noOfConflictingBooking != 0){
                throw new ConflictingBookingException("Room is already booked  for the selected dates");
            }
            else{
                //return reservationRepository.save(reservation);
            }
        }      
    }


    public Reservation saveReservation(Reservation reservation){
        Optional<User> optionalUser = userRepository.findById(reservation.getUser().getUserId());
        Optional<Room> optionalRoom = roomRepository.findById(reservation.getRoom().getRoomId());
        
        if(!optionalUser.isPresent()){
            throw new ResourceNotFoundException("User not found");
        }
        else if(!optionalRoom.isPresent()){
            throw new ResourceNotFoundException("Room not found");
        }
        else{
            reservation.setUser(optionalUser.get());
            reservation.setRoom(optionalRoom.get());
            
            return reservationRepository.save(reservation);
            
        }      
        
    }


    public List<Reservation> getAllReservations(){
        List<Reservation> reservationList = reservationRepository.findAll();
        return reservationList;
    }
    
}
