package com.Anjali.ECommerce.Controller;

import com.Anjali.ECommerce.Model.Home;
import com.Anjali.ECommerce.Model.HomeCategory;
import com.Anjali.ECommerce.Service.HomeCategoryService;
import com.Anjali.ECommerce.Service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api") // Base path for all routes in this controller
public class HomeCategoryController {

    private final HomeCategoryService homeCategoryService; // Service for managing home categories
    private final HomeService homeService; // Service for managing home page data

    // ---------------- Create multiple home categories and generate homepage ----------------
    @PostMapping("/home/categories")
    public ResponseEntity<Home> createHomeCategories(
            @RequestBody List<HomeCategory> homeCategories) {

        // Save all provided home categories
        List<HomeCategory> categories = homeCategoryService.createCategories(homeCategories);

        // Build the homepage using the saved categories
        Home home = homeService.createHomePageData(categories);

        return new ResponseEntity<>(home, HttpStatus.ACCEPTED); // Return created homepage data
    }

    // ---------------- Fetch all home categories ----------------
    @GetMapping("/admin/home-category")
    public ResponseEntity<List<HomeCategory>> getHomeCategory() throws Exception {
        List<HomeCategory> categories = homeCategoryService.getAllHomeCategories();
        return ResponseEntity.ok(categories); // Return list of categories
    }

    // ---------------- Update a home category ----------------
    @PatchMapping("/admin/home-category/{id}")
    public ResponseEntity<HomeCategory> updateHomeCategory(
            @PathVariable Long id,
            @RequestBody HomeCategory homeCategory) throws Exception {

        HomeCategory updatedCategory = homeCategoryService.updateHomeCategory(homeCategory, id);
        return ResponseEntity.ok(updatedCategory); // Return updated category
    }
}
