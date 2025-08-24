package com.example.FoodDelivery.service;

import com.example.FoodDelivery.dto.AddToCartRequest;
import com.example.FoodDelivery.dto.CartItemResponse;
import com.example.FoodDelivery.dto.CartResponse;
import com.example.FoodDelivery.model.*;
import com.example.FoodDelivery.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;

    public CartResponse addToCart(Long userId, AddToCartRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        MenuItem menuItem = menuItemRepository.findById(request.getMenuItemId())
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        CartItem existingItem = cart.getCartItems().stream()
                .filter(ci -> ci.getMenuItem().getId().equals(menuItem.getId()))
                .findFirst()
                .orElse(null);

        if (existingItem == null) {

            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setMenuItem(menuItem);
            newItem.setQuantity(request.getQuantity());
            newItem.setPrice(menuItem.getPrice());
            cart.getCartItems().add(newItem);
        } else {
            existingItem.setQuantity(existingItem.getQuantity() + request.getQuantity());
        }

        cartRepository.save(cart);

        return mapCartToResponse(cart);
    }

    public CartResponse viewCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart is empty"));

        return mapCartToResponse(cart);
    }

    private CartResponse mapCartToResponse(Cart cart) {
        if (cart.getCartItems() == null) {
            cart.setCartItems(new ArrayList<>());
        }
        List<CartItemResponse> items = cart.getCartItems().stream().map(ci ->
                new CartItemResponse(
                        ci.getId(),
                        ci.getMenuItem().getName(),
                        ci.getQuantity(),
                        ci.getPrice(),
                        ci.getQuantity() * ci.getPrice()
                )
        ).collect(Collectors.toList());

        double grandTotal = items.stream().mapToDouble(CartItemResponse::getTotal).sum();

        return new CartResponse(cart.getId(), items, grandTotal);
    }
}
