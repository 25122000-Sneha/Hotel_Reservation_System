package com.backend.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.entity.Hotel;
import com.backend.backend.entity.Reservation;
import com.backend.backend.service.HotelService;
import com.backend.backend.service.ReservationService;
import com.backend.backend.service.RoomService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private HotelService hotelService;

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private RoomService roomService;

    @GetMapping("/search-hotels")
    public ResponseEntity<?> searchHotels(@RequestParam String value) {
        List<Hotel> hotelList = hotelService.searchHotel(value);
        if(!hotelList.isEmpty()){
            return new ResponseEntity<>(hotelList, HttpStatus.OK);
        }
        else
        return new ResponseEntity<>("No results available", HttpStatus.BAD_REQUEST);
    }

    // @PostMapping("/add-reservation")
    // public ResponseEntity<?> addReservation(@RequestBody Reservation reservation) {
    //     Reservation createdReservation = reservationService.addReservation(reservation);
    //     if(createdReservation != null)
    //     {
    //         return new ResponseEntity<>(createdReservation, HttpStatus.CREATED);
    //     }
    //     else 
    //     {
    //         return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    //     }
        
    // }

    @PostMapping("/add-reservation")
    public ResponseEntity<?> addReservation(@RequestBody Reservation reservation){
        reservationService.addReservation(reservation);
        return ResponseEntity.status(HttpStatus.OK)
                             .body(Map.of("message", "Room available for selected dates! Proceed to pay"));
    }
    
    
    @GetMapping("/room-price/{id}")
    public ResponseEntity<Double> getRoomRateById(@PathVariable Long id){
        double roomPrice = roomService.getPriceByRoomId(id);
        return new ResponseEntity<>(roomPrice, HttpStatus.OK);
    }

    @PostMapping("/confirm-reservation")
    public ResponseEntity<Reservation> saveReservation(@RequestBody Reservation reservation){
        return new ResponseEntity<>(reservationService.saveReservation(reservation), HttpStatus.CREATED);
    }

    
}
