package com.example.FoodDelivery.dto;

import com.example.FoodDelivery.dto.OrderItemResponse;
import com.example.FoodDelivery.model.OrderStatus;
import lombok.Data;
import java.util.List;

@Data
public class OrderResponse {
    private Long id;
    private String customerName;
    private String customerAddress;
    private String mobileNumber;
    private List<OrderItemResponse> items;
    private double totalPrice;
    private OrderStatus status;
}
