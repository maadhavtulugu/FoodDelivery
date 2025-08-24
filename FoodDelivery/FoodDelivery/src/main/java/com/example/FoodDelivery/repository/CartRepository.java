package com.example.FoodDelivery.repository;

import com.example.FoodDelivery.model.Cart;
import com.example.FoodDelivery.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}
