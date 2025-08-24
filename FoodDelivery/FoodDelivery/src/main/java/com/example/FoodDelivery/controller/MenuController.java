package com.example.FoodDelivery.controller;

import com.example.FoodDelivery.dto.MenuItemRequest;
import com.example.FoodDelivery.dto.MenuItemResponse;
import com.example.FoodDelivery.model.MenuItem;
import com.example.FoodDelivery.service.MenuItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/menu")
@RequiredArgsConstructor
public class MenuController {

    private final MenuItemService menuItemService;

    @GetMapping("/all")
    public ResponseEntity<List<MenuItemResponse>> getAllMenuItems() {
        List<MenuItemResponse> items = menuItemService.getAllMenuItems();
        return ResponseEntity.ok(items);
    }

    @GetMapping
    public ResponseEntity<List<MenuItemResponse>> getMenuItems(@RequestParam Long restaurantId) {
        List<MenuItemResponse> items = menuItemService.getMenuItemsByRestaurant(restaurantId);
        return ResponseEntity.ok(items);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<MenuItemResponse> addMenuItem(@RequestParam Long restaurantId,
                                                        @RequestBody MenuItemRequest menuItemRequest) {
        MenuItemResponse created = menuItemService.createMenuItem(menuItemRequest, restaurantId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<MenuItemResponse> updateMenuItem(@PathVariable Long id,
                                                           @RequestBody MenuItemRequest menuItemRequest) {
        try {
            MenuItemResponse updated = menuItemService.updateMenuItem(id, menuItemRequest);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMenuItem(@PathVariable Long id) {
        try {
            menuItemService.deleteMenuItem(id);
            return ResponseEntity.ok().body("Menu item deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/image")
    public ResponseEntity<?> uploadMenuItemImage(@PathVariable Long id,
                                                 @RequestParam("file") MultipartFile file) {
        try {
            String publicPath = menuItemService.saveMenuItemImage(id, file);
            return ResponseEntity.ok(publicPath);
        } catch (IOException io) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to store file: " + io.getMessage());
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<List<MenuItemResponse>> filterAndSortMenu(
            @RequestParam Long restaurantId,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String sortOrder // "asc" or "desc"
    ){
        List<MenuItemResponse> items = menuItemService.getMenuItemsFilteredAndSorted(restaurantId, category, sortOrder);
        return ResponseEntity.ok(items);
    }

}
