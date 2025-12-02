package com.Anjali.ECommerce.Controller;

import com.Anjali.ECommerce.Model.Deal;
import com.Anjali.ECommerce.Service.DealService;
import com.Anjali.ECommerce.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/deals") // All routes start with /admin/deals
public class DealController {

    private final DealService dealService; // Service layer for deal operations

    // ---------------- Create a new deal ----------------
    @PostMapping()
    public ResponseEntity<Deal> createDeal(@RequestBody Deal deals) {
        Deal createdDeals = dealService.createDeal(deals); // Save the deal
        return new ResponseEntity<>(createdDeals, HttpStatus.ACCEPTED); // Return created deal
    }

    // ---------------- Update an existing deal ----------------
    @PatchMapping("/{id}")
    public ResponseEntity<Deal> updateDeal(
            @PathVariable Long id,
            @RequestBody Deal deal
    ) throws Exception {
        // Update deal with provided ID
        Deal updatedDeal = dealService.updateDeal(deal, id);
        return ResponseEntity.ok(updatedDeal); // Return updated deal
    }

    // ---------------- Delete a deal ----------------
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteDeals(@PathVariable Long id) throws Exception {
        dealService.deleteDeal(id); // Delete deal by ID

        // Send a response message
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Deal has been deleted");
        return new ResponseEntity<>(apiResponse, HttpStatus.ACCEPTED);
    }
}
