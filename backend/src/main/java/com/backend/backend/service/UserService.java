package com.backend.backend.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.backend.backend.entity.User;

public interface UserService {
    public User createUser(User user);
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
    public User getUserByUserName(String userName);
    public List<User> getAllUsers();
    public User updateUser(Long userId, User user);
    public User deleteUserById(Long userId);
}
