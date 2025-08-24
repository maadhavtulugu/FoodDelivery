package com.example.FoodDelivery.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    private Long restaurantId;
    private String customerName;
    private String customerAddress;
    private String mobileNumber;
    private List<OrderItemRequest> items;
}
