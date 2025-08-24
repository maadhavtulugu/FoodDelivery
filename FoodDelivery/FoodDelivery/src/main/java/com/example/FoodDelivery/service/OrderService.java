package com.example.FoodDelivery.service;

import com.example.FoodDelivery.dto.*;
import com.example.FoodDelivery.model.*;
import com.example.FoodDelivery.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.MapReactiveUserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    public OrderResponse placeOrderFromCart(Long userId, String deliveryAddress, String mobileNumber){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart is empty"));

        if (cart.getCartItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }
        Restaurant restaurant = cart.getCartItems().get(0).getMenuItem().getRestaurant();

        List<OrderItem> orderItems = cart.getCartItems().stream().map(ci -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setMenuItem(ci.getMenuItem());
            orderItem.setQuantity(ci.getQuantity());
            orderItem.setPrice(ci.getQuantity() * ci.getMenuItem().getPrice());
            return orderItem;
        }).toList();

        double totalPrice = orderItems.stream().mapToDouble(OrderItem::getPrice).sum();

        Order order = new Order();
        order.setRestaurant(restaurant);
        order.setUser(user);
        order.setCustomerName(user.getName());   // from user entity
        order.setMobileNumber(mobileNumber);
        order.setCustomerAddress(deliveryAddress);
        order.setItems(orderItems);
        order.setTotalPrice(totalPrice);
        order.setStatus(OrderStatus.PENDING);

        Order savedOrder = orderRepository.save(order);
        cart.getCartItems().clear();
        cartRepository.save(cart);

        return mapOrderToResponse(savedOrder);

    }


    public OrderResponse placeOrder(Long userId,OrderRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        // Fetch all menu items by IDs
        List<Long> menuItemIds = request.getItems().stream()
                .map(OrderItemRequest::getMenuItemId)
                .collect(Collectors.toList());

        List<MenuItem> menuItems = menuItemRepository.findAllById(menuItemIds);

        // Validation: all menu items must belong to the same restaurant
        for (MenuItem menuItem : menuItems) {
            if (!menuItem.getRestaurant().getId().equals(restaurant.getId())) {
                throw new RuntimeException("Menu item " + menuItem.getName() + " does not belong to restaurant " + restaurant.getName());
            }
        }
        // Convert OrderItemRequest → OrderItem
        List<OrderItem> orderItems = request.getItems().stream().map(itemReq -> {
            MenuItem menuItem = menuItems.stream()
                    .filter(m -> m.getId().equals(itemReq.getMenuItemId()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Menu item not found"));

            OrderItem orderItem = new OrderItem();
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(itemReq.getQuantity());
            orderItem.setPrice(menuItem.getPrice() * itemReq.getQuantity());
            return orderItem;
        }).collect(Collectors.toList());

        // Calculate total price
        double totalPrice = orderItems.stream().mapToDouble(OrderItem::getPrice).sum();

        // Save order
        Order order = new Order();
        order.setRestaurant(restaurant);
        order.setUser(user);
        order.setCustomerName(request.getCustomerName());
        order.setCustomerAddress(request.getCustomerAddress());
        order.setMobileNumber(request.getMobileNumber());
        order.setItems(orderItems);
        order.setTotalPrice(totalPrice);
        order.setStatus(OrderStatus.PENDING);

        Order savedOrder = orderRepository.save(order);

        return mapOrderToResponse(savedOrder);
    }

    public List<Order> getOrdersByRestaurant(Long restaurantId) {
        return orderRepository.findByRestaurantId(restaurantId);
    }

    public OrderResponse updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        orderRepository.save(order);
        return mapOrderToResponse(order);
    }

    public OrderResponse cancelOrder(Long orderId, Long userId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(userId)) {
            throw new RuntimeException("You can cancel only your own orders");
        }

        if (order.getStatus() == OrderStatus.PREPARING ||
                order.getStatus() == OrderStatus.OUT_FOR_DELIVERY ||
                order.getStatus() == OrderStatus.DELIVERED) {
            throw new RuntimeException("Cannot cancel order at this stage");
        }

        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
        return mapOrderToResponse(order);
    }

    public List<OrderResponse> getOrdersByUser(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);

        return orders.stream()
                .map(this::mapOrderToResponse)
                .collect(Collectors.toList());
    }

    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::mapOrderToResponse)
                .toList();
    }

    public OrderResponse getOrderById(Long orderId, Long userId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(userId)) {
            throw new RuntimeException("You are not allowed to view this order");
        }

        return mapOrderToResponse(order);
    }
    private OrderResponse mapOrderToResponse(Order order) {
        List<OrderItemResponse> items = order.getItems().stream()
                .map(oi -> new OrderItemResponse(
                        oi.getMenuItem().getName(),
                        oi.getQuantity(),
                        oi.getPrice()
                ))
                .collect(Collectors.toList());

        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setCustomerName(order.getCustomerName());
        response.setCustomerAddress(order.getCustomerAddress());
        response.setMobileNumber(order.getMobileNumber());
        response.setItems(items);
        response.setTotalPrice(order.getTotalPrice());
        response.setStatus(order.getStatus());
        return response;
    }
}
