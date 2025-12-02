package com.Anjali.ECommerce.Controller;

import com.Anjali.ECommerce.Model.Cart;
import com.Anjali.ECommerce.Model.Coupons;
import com.Anjali.ECommerce.Model.User;
import com.Anjali.ECommerce.Service.CartService;
import com.Anjali.ECommerce.Service.CouponService;
import com.Anjali.ECommerce.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coupons")
public class AdminCouponController {

    private final CouponService couponService;
    private final UserService userService;
    private final CartService cartService;

    // Endpoint to apply or remove a coupon for the logged-in user
    @GetMapping("/apply") // Added GET mapping for the method
    public ResponseEntity<Cart> applyCoupon(
            @RequestParam String apply,         // "true" to apply, "false" to remove
            @RequestParam String code,          // Coupon code
            @RequestParam double orderValue,    // Current order value
            @RequestHeader("Authorization") String jwt) throws Exception {

        // Get user from JWT token
        User user = userService.findUserByJwtToken(jwt);

        Cart cart;
        if (apply.equals("true")) {
            // Apply coupon
            cart = couponService.applyCoupon(code, orderValue, user);
        } else {
            // Remove coupon
            cart = couponService.removeCoupon(code, user);
        }

        return ResponseEntity.ok(cart);
    }

    // Admin endpoint to create a new coupon
    @PostMapping("/admin/create")
    public ResponseEntity<Coupons> createCoupon(@RequestBody Coupons coupon) throws Exception {
        Coupons createdCoupon = couponService.createCoupon(coupon);
        return ResponseEntity.ok(createdCoupon);
    }

    // Admin endpoint to delete a coupon by ID
    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<?> deleteCoupon(@PathVariable Long id) throws Exception {
        couponService.deleteCoupon(id);
        return ResponseEntity.ok("Coupon deleted successfully");
    }

    // Admin endpoint to get all coupons
    @GetMapping("/admin/all")
    public ResponseEntity<List<Coupons>> getAllCoupons() throws Exception {
        List<Coupons> coupons = couponService.findAllCoupons();
        return ResponseEntity.ok(coupons);
    }
}
