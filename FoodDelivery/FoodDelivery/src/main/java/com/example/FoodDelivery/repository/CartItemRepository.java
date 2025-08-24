package com.example.FoodDelivery.repository;

import com.example.FoodDelivery.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    boolean existsByMenuItemId(Long menuItemId);
}
