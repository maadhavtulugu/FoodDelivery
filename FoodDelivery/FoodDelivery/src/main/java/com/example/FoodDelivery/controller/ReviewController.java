package com.example.FoodDelivery.controller;

import com.example.FoodDelivery.dto.ReviewRequest;
import com.example.FoodDelivery.dto.ReviewResponse;
import com.example.FoodDelivery.model.Review;
import com.example.FoodDelivery.model.User;
import com.example.FoodDelivery.repository.UserRepository;
import com.example.FoodDelivery.security.UserDetailsImpl;
import com.example.FoodDelivery.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("menu-items/{menuItemId}/reviews")
public class ReviewController {

    private final ReviewService reviewService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<ReviewResponse>> getReviews(@PathVariable Long menuItemId) {
        return ResponseEntity.ok(reviewService.getReviewsForMenuItem(menuItemId));
    }

    @PostMapping
    public ResponseEntity<ReviewResponse> addReview(@PathVariable Long menuItemId,
                                                    @RequestBody ReviewRequest request,
                                                    @AuthenticationPrincipal UserDetailsImpl userDetails) {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        ReviewResponse saved = reviewService.addReview(
                menuItemId,
                user.getId(),
                request.getRating(),
                request.getComment()
        );

        return ResponseEntity.ok(saved);
    }
}
