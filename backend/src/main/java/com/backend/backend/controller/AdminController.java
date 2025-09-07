package com.backend.backend.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.backend.entity.Hotel;
import com.backend.backend.entity.Location;
import com.backend.backend.entity.Reservation;
import com.backend.backend.entity.Room;
import com.backend.backend.entity.User;
import com.backend.backend.repository.LocationRepository;
import com.backend.backend.service.FileUploadService;
import com.backend.backend.service.HotelService;
import com.backend.backend.service.LocationService;
import com.backend.backend.service.ReservationService;
import com.backend.backend.service.RoomService;
import com.backend.backend.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
public class AdminController {

    @Autowired
    private LocationService locationService;

    @Autowired
    private HotelService hotelService;

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private ReservationService reservationService;

    
    @Autowired
    private LocationRepository locationRepository;

    @PostMapping("/api/admin/add-location")
    public ResponseEntity<Location> addLocation(@RequestBody Location location){
        return new ResponseEntity<>(locationService.addLocation(location), HttpStatus.CREATED);
    }

    @PostMapping("/api/admin/add-hotel")
    public ResponseEntity<?> addHotel(@RequestParam MultipartFile file, 
                                        @RequestParam String hotelName,
                                        @RequestParam String description,
                                        @RequestParam String address,
                                        @RequestParam Long locationId,
                                        @RequestParam String phoneNumber,
                                        @RequestParam String emailId,
                                        @RequestParam int rating
                                        ){

        Location location;
        try{
            //String imagePath = fileUploadService.uploadFile(file);

            Optional<Location> optionalLocation = locationRepository.findById(locationId);
            if(optionalLocation.isPresent()){
                location = optionalLocation.get();
            } 
            else {
                return new ResponseEntity<>("Location not found with given id", HttpStatus.BAD_REQUEST);
            }

            Hotel hotel = new Hotel();
            hotel.setHotelName(hotelName);
            hotel.setDescription(description);
            hotel.setAddress(address);
            hotel.setLocation(location);
            hotel.setPhoneNumber(phoneNumber);
            hotel.setEmailId(emailId);
            hotel.setRating(rating);
            return new ResponseEntity<>(hotelService.addHotel(file, hotel), HttpStatus.CREATED);
        
        }
        catch(Exception e){
            return new ResponseEntity<>("Failed to add hotel", HttpStatus.BAD_REQUEST);
        }

        
        
    }

    @GetMapping("/api/admin/locations")
    public ResponseEntity<List<Location>> getAllLocations(){
        List<Location> locationList = locationService.getAllLocations();
        return new ResponseEntity<>(locationList, HttpStatus.OK);
    }

    @GetMapping("/api/admin/view-hotels/{cityName}")
    public ResponseEntity<List<Hotel>> getHotelsByLocation(@PathVariable String cityName){
        System.out.println("Inside controller");
        List<Hotel> hotelList = hotelService.findHotelsByCityName(cityName);
        return new ResponseEntity<>(hotelList, HttpStatus.OK);
    }

    
    
    @GetMapping("/api/admin/hotels/{hotelId}/rooms")
    public ResponseEntity<List<Room>> getRoomsByHotel(@PathVariable Long hotelId) {
        return new ResponseEntity<>(roomService.getAllRoomsByHotel(hotelId), HttpStatus.OK);
    }


    @PostMapping("/api/admin/hotels/{hotelId}/add-room")
    public  ResponseEntity<Room> postRoom(@RequestBody Room room, @PathVariable Long hotelId) {
        return new ResponseEntity<>(roomService.addRoom(room, hotelId), HttpStatus.CREATED);
    }
    
    @GetMapping("/api/admin/hotel/{hotelId}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable long hotelId){
        Hotel hotel = hotelService.getHotelById(hotelId);
        if(hotel != null){
            return new ResponseEntity<Hotel>(hotel, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/api/admin/all-reservations")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return new ResponseEntity<>(reservationService.getAllReservations(), HttpStatus.OK);
    }
    

    
    
}
