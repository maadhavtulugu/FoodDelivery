package com.example.FoodDelivery.controller;

import com.example.FoodDelivery.dto.*;
import com.example.FoodDelivery.model.*;
import com.example.FoodDelivery.repository.UserRepository;
import com.example.FoodDelivery.security.UserDetailsImpl;
import com.example.FoodDelivery.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;

    @PostMapping("/direct")
    public OrderResponse placeOrder(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody OrderRequest request) {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderService.placeOrder(user.getId(),request);
    }

    @PostMapping("/cart")
    public OrderResponse placeOrderFromCart(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestParam String deliveryAddress,
            @RequestParam String mobileNumber) {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderService.placeOrderFromCart(user.getId(), deliveryAddress, mobileNumber);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{orderId}/status")
    public OrderResponse updateOrderStatus(@PathVariable Long orderId, @RequestParam OrderStatus status) {
        return  orderService.updateOrderStatus(orderId, status);
    }

    @PutMapping("/{orderId}/cancel")
    public OrderResponse cancelOrder(@PathVariable Long orderId,
                             @AuthenticationPrincipal UserDetailsImpl userDetails) {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderService.cancelOrder(orderId, user.getId());
    }

    @GetMapping("/restaurant/{restaurantId}")
    public List<Order> getOrdersByRestaurant(@PathVariable Long restaurantId) {
        return orderService.getOrdersByRestaurant(restaurantId);
    }
    @GetMapping("/me")
    public List<OrderResponse> getMyOrders(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderService.getOrdersByUser(user.getId());
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<OrderResponse> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{orderId}")
    public OrderResponse getOrderById(
            @PathVariable Long orderId,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderService.getOrderById(orderId, user.getId());
    }
}
