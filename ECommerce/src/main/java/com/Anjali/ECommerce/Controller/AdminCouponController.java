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

    // ============================
    // ⭐ APPLY COUPON
    // GET /api/coupons/apply?code=TEST50&orderValue=1500
    // ============================
    @GetMapping("/apply")
    public ResponseEntity<?> applyCoupon(
            @RequestParam String code,
            @RequestParam double orderValue,
            @RequestHeader("Authorization") String jwt
    ) {
        try {
            User user = userService.findUserByJwtToken(jwt);

            Cart cart = couponService.applyCoupon(code, orderValue, user);

            return ResponseEntity.ok(cart);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ============================
    // ⭐ REMOVE COUPON
    // ============================
    @GetMapping("/remove")
    public ResponseEntity<?> removeCoupon(
            @RequestParam String code,
            @RequestHeader("Authorization") String jwt
    ) {
        try {
            User user = userService.findUserByJwtToken(jwt);

            Cart cart = couponService.removeCoupon(code, user);

            return ResponseEntity.ok(cart);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ============================
    // ⭐ CREATE COUPON (ADMIN)
    // ============================
    @PostMapping("/admin/create")
    public ResponseEntity<Coupons> createCoupon(@RequestBody Coupons coupon) throws Exception {
        Coupons createdCoupon = couponService.createCoupon(coupon);
        return ResponseEntity.ok(createdCoupon);
    }

    // ============================
    // ⭐ GET ACTIVE COUPONS (USER)
    // ============================
    @GetMapping("/active")
    public ResponseEntity<List<Coupons>> getActiveCoupons() {
        List<Coupons> activeCoupons = couponService.findActiveCoupons();
        return ResponseEntity.ok(activeCoupons);
    }

    // ============================
    // ⭐ DELETE COUPON (ADMIN)
    // ============================
    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<?> deleteCoupon(@PathVariable Long id) throws Exception {
        couponService.deleteCoupon(id);
        return ResponseEntity.ok("Coupon deleted successfully");
    }

    // ============================
    // ⭐ GET ALL COUPONS (ADMIN)
    // ============================
    @GetMapping("/admin/all")
    public ResponseEntity<List<Coupons>> getAllCoupons() throws Exception {
        List<Coupons> coupons = couponService.findAllCoupons();
        return ResponseEntity.ok(coupons);
    }
}
