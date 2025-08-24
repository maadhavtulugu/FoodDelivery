package com.example.FoodDelivery.repository;

import com.example.FoodDelivery.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByRestaurantId(Long restaurantId);

    List<Order> findByUserId(Long userId);
}
