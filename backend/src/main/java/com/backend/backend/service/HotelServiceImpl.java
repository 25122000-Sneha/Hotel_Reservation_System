package com.backend.backend.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.backend.backend.entity.Hotel;
import com.backend.backend.entity.Location;
import com.backend.backend.entity.Room;
import com.backend.backend.repository.HotelRepository;
import com.backend.backend.repository.LocationRepository;
import com.backend.backend.repository.RoomRepository;

@Service
public class HotelServiceImpl implements HotelService{

    @Autowired
    private HotelRepository hotelRepository;


    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private FileUploadService fileUploadService;
    
    public Hotel addHotel(MultipartFile file, Hotel hotel) throws IOException{

        String imagePath = fileUploadService.uploadFile(file);

        hotel.setImagePath(UPLOAD_DIR + imagePath);

        //Optional<Location> optionalLocation = locationRepository.findById(hotel.getLocation().getLocationId());

        System.out.println("ImagePath: "+imagePath);
        return hotelRepository.save(hotel);
        
        
        
    }
    


    public List<Hotel> findHotelsByCityName(String cityName){
        List<Hotel> hotelList = hotelRepository.findHotelsByCityName(cityName);
        System.out.println("inside service");
        System.out.println("Hotel list in"+cityName+hotelList);
        return hotelList;
    }


    public Page<Hotel> getAllHotels(Pageable pageable){
        Page<Hotel> hotels = hotelRepository.findAll(pageable);
        return hotels;
    }

    public Hotel getHotelById(long hotelId){
        Optional<Hotel> optionalHotel = hotelRepository.findById(hotelId);
        if(optionalHotel.isPresent()){
            return optionalHotel.get();
        }
        else
        return null;
    }

    public Page<Hotel> searchHotel(String value, Pageable pageable){
        Page<Hotel> hotelList = hotelRepository.searchHotel(value, pageable);
        return hotelList;
    }


}
