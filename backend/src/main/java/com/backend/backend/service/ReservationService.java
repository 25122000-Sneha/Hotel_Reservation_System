package com.backend.backend.service;

import java.util.List;

import com.backend.backend.entity.Reservation;

public interface ReservationService {
    public void addReservation(Reservation reservation);
    public List<Reservation> getAllReservations();
    public Reservation saveReservation(Reservation reservation);
}
