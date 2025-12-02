package com.Anjali.ECommerce.Service.Impl;

import com.Anjali.ECommerce.Model.Cart;
import com.Anjali.ECommerce.Model.Coupons;
import com.Anjali.ECommerce.Model.User;
import com.Anjali.ECommerce.Repository.CartRepository;
import com.Anjali.ECommerce.Repository.CouponRepository;
import com.Anjali.ECommerce.Repository.UserRepository;
import com.Anjali.ECommerce.Service.CouponService;
import com.stripe.model.Coupon;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    // Repository for Coupon operations
    private final CouponRepository couponRepository;

    // Repository for User operations
    private final UserRepository userRepository;

    // Repository for Cart operations
    private final CartRepository cartRepository;

    /**
     * Apply a coupon to the user's cart.
     * Checks validity, usage, minimum order value, and date range.
     */
    @Override
    public Cart applyCoupon(String code, double orderValue, User user) throws Exception {
        Coupons coupon = couponRepository.findByCode(code);
        Cart cart = cartRepository.findByUserId(user.getId());

        if(coupon == null){
            throw new Exception("Coupon not valid");
        }

        // Check if user has already used this coupon
        if(user.getUsedCoupons().contains(coupon)){
            throw new Exception("Coupon already used");
        }

        // Check if order meets minimum value requirement
        if(orderValue < coupon.getMinimumOrderValue()){
            throw new Exception("Order value is lower than coupon price " + coupon.getMinimumOrderValue());
        }

        // Check coupon is active and within valid date range
        if(coupon.isActive() && LocalDate.now().isAfter(coupon.getValidityStratDate())
                && LocalDate.now().isBefore(coupon.getValidityEndDate())){
            // Add coupon to user's used list
            user.getUsedCoupons().add(coupon);
            userRepository.save(user);

            // Apply discount to cart
            double discountedPrice = (cart.getTotalSellingPrice() * coupon.getDiscountPercentage()) / 100;
            cart.setTotalSellingPrice(cart.getTotalSellingPrice() - discountedPrice);
            cart.setCouponCode(code);
            cartRepository.save(cart);

            return cart;
        }

        throw new Exception("Coupon not valid");
    }

    /**
     * Remove a coupon from the user's cart.
     * Restores the original cart total.
     */
    @Override
    public Cart removeCoupon(String code, User user) throws Exception {
        Coupons coupon = couponRepository.findByCode(code);
        if(coupon == null){
            throw new Exception("Coupon not found");
        }

        Cart cart = cartRepository.findByUserId(user.getId());
        double discountedPrice = (cart.getTotalSellingPrice() * coupon.getDiscountPercentage()) / 100;

        // Remove discount and clear coupon code
        cart.setTotalSellingPrice(cart.getTotalSellingPrice() + discountedPrice);
        cart.setCouponCode(null);

        return cartRepository.save(cart);
    }

    /**
     * Find a coupon by its ID.
     */
    @Override
    public Coupons findCouponById(Long id) throws Exception {
        return couponRepository.findById(id).orElseThrow(() ->
                new Exception("Coupon not found"));
    }

    /**
     * Create a new coupon (Admin only).
     */
    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Coupons createCoupon(Coupons coupon) {
        return couponRepository.save(coupon);
    }

    /**
     * Retrieve all coupons.
     */
    @Override
    public List<Coupons> findAllCoupons() {
        return couponRepository.findAll();
    }

    /**
     * Delete a coupon by ID (Admin only).
     */
    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCoupon(Long id) throws Exception {
        // Ensure coupon exists before deletion
        findCouponById(id);
        couponRepository.deleteById(id);
    }
}
