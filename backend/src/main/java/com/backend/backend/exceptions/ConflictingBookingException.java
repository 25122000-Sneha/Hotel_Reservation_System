package com.backend.backend.exceptions;

public class ConflictingBookingException extends RuntimeException{

    public ConflictingBookingException(String msg){
        super(msg);
    }
    
}
