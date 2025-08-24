package com.example.FoodDelivery.repository;

import com.example.FoodDelivery.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByRestaurantId(Long restaurantId);

    List<MenuItem> findByRestaurantIdAndCategory(Long restaurantId, String category);

    List<MenuItem> findByRestaurantIdOrderByPriceAsc(Long restaurantId);

    List<MenuItem> findByRestaurantIdOrderByPriceDesc(Long restaurantId);

    List<MenuItem> findByRestaurantIdAndCategoryOrderByPriceAsc(Long restaurantId, String category);

    List<MenuItem> findByRestaurantIdAndCategoryOrderByPriceDesc(Long restaurantId, String category);
}
