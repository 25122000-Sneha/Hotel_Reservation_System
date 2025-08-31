package com.backend.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend.entity.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    public Optional<User> findByUserName(String userName);
    
    // @Query("SELECT u.userId, u.userName from User u")
    // public List<User> findAllUsers();
} 
