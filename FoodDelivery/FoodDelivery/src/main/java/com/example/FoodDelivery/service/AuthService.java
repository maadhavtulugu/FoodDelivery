package com.example.FoodDelivery.service;

import com.example.FoodDelivery.dto.*;
import com.example.FoodDelivery.model.User;
import com.example.FoodDelivery.repository.UserRepository;
import com.example.FoodDelivery.security.JwtUtils;
import com.example.FoodDelivery.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final OrderService orderService;

    public JwtResponse register(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.CUSTOMER) // Default role
                .build();

        userRepository.save(user);

        String token = jwtUtils.generateToken(user);

        return new JwtResponse(token, "Bearer", user.getId(), user.getEmail(), user.getRole().name());
    }

    public JwtResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String token = jwtUtils.generateToken(user);

        return new JwtResponse(token, "Bearer", user.getId(), user.getEmail(), user.getRole().name());
    }


    public UserProfileResponse getCurrentUserProfile(UserDetailsImpl userPrincipal) {
        if (userPrincipal == null) {
            throw new RuntimeException("User not authenticated");
        }

        User user = userPrincipal.getUser();

        return new UserProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }
}

