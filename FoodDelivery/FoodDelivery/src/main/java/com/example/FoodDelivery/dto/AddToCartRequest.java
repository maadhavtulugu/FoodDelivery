package com.example.FoodDelivery.dto;

import lombok.Data;

@Data
public class AddToCartRequest {
    private Long menuItemId;
    private int quantity;
}
