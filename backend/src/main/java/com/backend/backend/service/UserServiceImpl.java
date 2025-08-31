package com.backend.backend.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.backend.config.UserInfoUserDetails;
import com.backend.backend.entity.User;
import com.backend.backend.repository.UserRepository;

@Service
public class UserServiceImpl implements UserDetailsService, UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    public User createUser(User user){
        Optional<User> existingUser = userRepository.findByUserName(user.getUserName());
        if(existingUser.isPresent())
        {
            return null;
        }
        else
        {
            user.setPassword(encoder.encode(user.getPassword()));
            return userRepository.save(user);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        Optional<User> user = userRepository.findByUserName(username);
        return user.map(UserInfoUserDetails::new)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found "+ username));
    }

    public User getUserByUserName(String userName){
        return userRepository.findByUserName(userName).get();
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User updateUser(Long userId, User user){
       Optional<User> optionalUser = userRepository.findById(userId);
       if(optionalUser.isPresent()){
        User existingUser = optionalUser.get();
        existingUser.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(existingUser);
        return existingUser;
       }
       else 
       return null;
    }

    public User deleteUserById(Long userId){
        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isPresent()){
            User deletedUser = optionalUser.get();
            userRepository.deleteById(userId);
            return deletedUser;
        }
        else
        return null;
    }

    
    
}
