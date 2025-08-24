package com.example.FoodDelivery.service;

import com.example.FoodDelivery.dto.MenuItemRequest;
import com.example.FoodDelivery.dto.MenuItemResponse;
import com.example.FoodDelivery.model.MenuItem;
import com.example.FoodDelivery.model.Restaurant;
import com.example.FoodDelivery.repository.CartItemRepository;
import com.example.FoodDelivery.repository.MenuItemRepository;
import com.example.FoodDelivery.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final RestaurantRepository restaurantRepository;
    private final CartItemRepository cartItemRepository;

    @Value("${app.upload.dir}")
    private String uploadDir;

    public List<MenuItemResponse> getAllMenuItems() {
        return menuItemRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<MenuItemResponse> getMenuItemsByRestaurant(Long restaurantId) {
        return menuItemRepository.findByRestaurantId(restaurantId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public MenuItemResponse createMenuItem(MenuItemRequest request, Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found with id: " + restaurantId));

        MenuItem menuItem = new MenuItem();
        menuItem.setName(request.getName());
        menuItem.setDescription(request.getDescription());
        menuItem.setPrice(request.getPrice());
        menuItem.setRestaurant(restaurant);
        menuItem.setCategory(request.getCategory());

        MenuItem saved = menuItemRepository.save(menuItem);
        return toResponse(saved);
    }

    public MenuItemResponse getMenuItemById(Long id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found with id: " + id));
        return toResponse(menuItem);
    }


    public MenuItemResponse updateMenuItem(Long id, MenuItemRequest request) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found with id: " + id));

        menuItem.setName(request.getName());
        menuItem.setDescription(request.getDescription());
        menuItem.setPrice(request.getPrice());
        menuItem.setCategory(request.getCategory());

        MenuItem saved = menuItemRepository.save(menuItem);
        return toResponse(saved);
    }

    @Transactional
    public void deleteMenuItem(Long id) {
//        if (!menuItemRepository.existsById(id)) {
//            throw new RuntimeException("Menu item not found with id: " + id);
//        }
//        menuItemRepository.deleteById(id);

        if(cartItemRepository.existsByMenuItemId(id))
            throw new RuntimeException("Cannot delete menu item. It exists in user carts.");
        menuItemRepository.deleteById(id);
    }

    public String saveMenuItemImage(Long menuItemId, MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("No file provided");
        }

        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("Menu item not found with id: " + menuItemId));

        String contentType = file.getContentType() == null ? "" : file.getContentType().toLowerCase();
        if (!(contentType.contains("image/png") || contentType.contains("image/jpeg") || contentType.contains("image/jpg"))) {
            throw new RuntimeException("Only PNG and JPEG images are allowed");
        }

        String original = file.getOriginalFilename() == null ? "image" : file.getOriginalFilename();

        String safeOriginal = original.replaceAll("[^a-zA-Z0-9\\.\\-_]", "_");

        String filename = UUID.randomUUID() + "_" + safeOriginal;

        // directory: <uploadDir>
        Path dir = Paths.get(uploadDir);
        Files.createDirectories(dir);

        Path target = dir.resolve(filename);
        try (InputStream in = file.getInputStream()) {
            Files.copy(in, target, StandardCopyOption.REPLACE_EXISTING);
        }

        String publicPath = "/images/" + filename;

        menuItem.setImage(publicPath);
        menuItemRepository.save(menuItem);

        return publicPath;
    }

    public List<MenuItemResponse> getMenuItemsFilteredAndSorted(Long restaurantId, String category, String sortOrder) {
        List<MenuItem> items;

        if (category != null && sortOrder != null) {
            if (sortOrder.equalsIgnoreCase("asc")) {
                items = menuItemRepository.findByRestaurantIdAndCategoryOrderByPriceAsc(restaurantId, category);
            } else {
                items = menuItemRepository.findByRestaurantIdAndCategoryOrderByPriceDesc(restaurantId, category);
            }
        } else if (category != null) {
            items = menuItemRepository.findByRestaurantIdAndCategory(restaurantId, category);
        } else if (sortOrder != null) {
            if (sortOrder.equalsIgnoreCase("asc")) {
                items = menuItemRepository.findByRestaurantIdOrderByPriceAsc(restaurantId);
            } else {
                items = menuItemRepository.findByRestaurantIdOrderByPriceDesc(restaurantId);
            }
        } else {
            items = menuItemRepository.findByRestaurantId(restaurantId);
        }
        // Convert to DTO
        return items.stream()
                .map(this::toResponse)
                .toList();
    }

    private MenuItemResponse toResponse(MenuItem menuItem) {
        return new MenuItemResponse(
                menuItem.getId(),
                menuItem.getName(),
                menuItem.getDescription(),
                menuItem.getPrice(),
                menuItem.getImage(),
                menuItem.getRestaurant().getId(),
                menuItem.getCategory()
        );
    }



}
