package com.example.FoodDelivery.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ReviewResponse {
    private Long id;
    private int rating;
    private String comment;
    private String userName;
    private LocalDateTime createdAt;
}
