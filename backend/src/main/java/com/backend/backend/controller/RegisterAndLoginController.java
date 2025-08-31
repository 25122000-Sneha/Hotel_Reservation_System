package com.backend.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.backend.backend.dto.LoginRequest;
import com.backend.backend.dto.LoginResponse;
import com.backend.backend.entity.User;
import com.backend.backend.jwt.JwtUtil;
import com.backend.backend.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
public class RegisterAndLoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/api/user/signup")
    public ResponseEntity<User> registerUser(@RequestBody User user){
        User createdUser = userService.createUser(user);
        if(createdUser!=null){
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/api/user/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword()));
        }
        catch(AuthenticationException e){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password", e);
        }

        final UserDetails userDetails = userService.loadUserByUsername(loginRequest.getUserName());
        final String token = jwtUtil.generateToken(userDetails.getUsername());

        User user = userService.getUserByUserName(loginRequest.getUserName());

        return new ResponseEntity<>(new LoginResponse(token, user.getUserName(), user.getEmail(), user.getRole(), user.getUserId()), HttpStatus.OK);
    }

    @GetMapping("/api/get-all-users")
    public ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

   
    @GetMapping("/api/get-user/{userName}")
    public ResponseEntity<User> getUserByUserName(@PathVariable String userName){
        System.out.println("abc");
        return new ResponseEntity<>(userService.getUserByUserName(userName), HttpStatus.OK);
    }



    @PutMapping("/api/update-user/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User user) {
        User updatedUser = userService.updateUser(userId, user);
        if(updatedUser!=null){
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/api/admin/delete-user/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId){
        User user = userService.deleteUserById(userId);
        if(user != null){
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("User ID doesn't exist", HttpStatus.BAD_REQUEST);
        }

    }
    
}
