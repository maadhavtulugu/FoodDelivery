package com.example.FoodDelivery.repository;

import com.example.FoodDelivery.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByMenuItemId(Long menuItemId);

    List<Review> findByMenuItemIdOrderByCreatedAtDesc(Long menuItemId);
}
