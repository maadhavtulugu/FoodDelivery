
package com.example.FoodDelivery.dto;

import lombok.Data;

@Data
public class ReviewRequest {
    private int rating;
    private String comment;
}
