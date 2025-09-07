package com.backend.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.backend.backend.jwt.JwtRequestFilter;
import com.backend.backend.service.UserServiceImpl;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // injecting JwtRequestFilter
    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserServiceImpl();
    }

    // method to filter request on the basis of roles
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // return http.cors(cors -> cors.configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues()))
        return http.cors(withDefaults())        
        .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authz -> authz
                    .requestMatchers("/api/user/signup").permitAll() //permits unauthorized access for signup endpoint
                    .requestMatchers("/api/user/login").permitAll()  //permits unauthorized access for login endpoint
                    .requestMatchers("api/update-user/{userId}").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/get-user/{userName}").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/get-all-users").permitAll()
                    .requestMatchers(HttpMethod.DELETE, "/api/admin/delete-user/{userId}").hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.POST, "/api/admin/add-location").hasAuthority("Admin")
                    .requestMatchers(HttpMethod.POST, "/api/admin/add-hotel").hasAuthority("Admin")
                    .requestMatchers(HttpMethod.GET, "/api/admin/locations").hasAuthority("Admin")
                    .requestMatchers(HttpMethod.GET, "/api/customer/hotels").hasAuthority("Customer")
                    .requestMatchers(HttpMethod.GET, "/api/admin/view-hotels/{cityName}").hasAuthority("Admin")
                    .requestMatchers(HttpMethod.POST, "/api/admin/hotels/{hotelId}/add-room").hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.GET, "/api/admin/hotels/{hotelId}/rooms").hasAnyAuthority("Admin", "Customer")
                    .requestMatchers(HttpMethod.GET, "/api/admin/hotel/{hotelId}").hasAnyAuthority("Admin", "Customer")
                    .requestMatchers(HttpMethod.GET, "/api/admin/all-reservations").hasAuthority("Admin")
                    .requestMatchers(HttpMethod.GET, "/api/customer/search-hotels").hasAuthority("Customer")
                    .requestMatchers(HttpMethod.POST, "/api/customer/add-reservation").hasAuthority("Customer")
                    .requestMatchers(HttpMethod.POST, "/api/paypal/createPayment").hasAuthority("Customer")
                    .requestMatchers(HttpMethod.GET, "/api/customer/room-price/{id}").hasAuthority("Customer")
                    .requestMatchers(HttpMethod.POST, "/api/customer/confirm-reservation").hasAuthority("Customer")
                    .requestMatchers("/api/**").authenticated()     //requires authentication for all other endpoints
                    .requestMatchers("/uploads/**").permitAll()
                )
                .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }


    
    @Bean
    public PasswordEncoder passwordEncoders() {
        return new BCryptPasswordEncoder();
    }

    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoders());
        return authenticationProvider;
    }
}