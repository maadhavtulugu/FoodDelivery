package com.example.FoodDelivery.controller;

import com.example.FoodDelivery.dto.AddToCartRequest;
import com.example.FoodDelivery.dto.CartResponse;
import com.example.FoodDelivery.model.User;
import com.example.FoodDelivery.repository.UserRepository;
import com.example.FoodDelivery.security.UserDetailsImpl;
import com.example.FoodDelivery.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@CrossOrigin
public class CartController {

    private final CartService cartService;
    private final UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<CartResponse> addToCart(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody AddToCartRequest request) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(cartService.addToCart(user.getId(), request));
    }

    @GetMapping
    public ResponseEntity<CartResponse> viewCart( @AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(cartService.viewCart(user.getId()));
    }
}
