package com.example.FoodDelivery.dto;

import lombok.Data;

@Data
public class RestaurantRequest {
    private String name;
    private String address;
    private String cuisineType;
}
