package com.backend.backend.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginResponse {
    private String token;
    private String userName;
    private String email;
    private String role;
    private Long userId;

    @JsonCreator
    public LoginResponse(@JsonProperty("token") String token, @JsonProperty("userName") String userName, @JsonProperty("email") String email, @JsonProperty("role") String role, @JsonProperty("userId")Long userId) {
        this.token = token;
        this.userName = userName;
        this.email = email;
        this.role = role;
        this.userId = userId;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    
}
