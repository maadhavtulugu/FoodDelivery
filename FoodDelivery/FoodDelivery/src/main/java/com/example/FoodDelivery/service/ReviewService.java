package com.example.FoodDelivery.service;

import com.example.FoodDelivery.dto.ReviewResponse;
import com.example.FoodDelivery.model.MenuItem;
import com.example.FoodDelivery.model.Review;
import com.example.FoodDelivery.model.User;
import com.example.FoodDelivery.repository.MenuItemRepository;
import com.example.FoodDelivery.repository.ReviewRepository;
import com.example.FoodDelivery.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;

    public ReviewResponse addReview(Long menuItemId, Long userId, int rating, String comment) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Review review = new Review();
        review.setRating(rating);
        review.setComment(comment);
        review.setMenuItem(menuItem);
        review.setUser(user);

        Review saved = reviewRepository.save(review);

        return ReviewResponse.builder()
                .id(saved.getId())
                .rating(saved.getRating())
                .comment(saved.getComment())
                .userName(saved.getUser().getName())
                .createdAt(saved.getCreatedAt())
                .build();
    }

    public List<ReviewResponse> getReviewsForMenuItem(Long menuItemId) {
        return reviewRepository.findByMenuItemIdOrderByCreatedAtDesc(menuItemId).stream()
                .map(r -> ReviewResponse.builder()
                        .id(r.getId())
                        .rating(r.getRating())
                        .comment(r.getComment())
                        .userName(r.getUser().getName())
                        .createdAt(r.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
