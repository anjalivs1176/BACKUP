package com.Anjali.ECommerce.Model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// @Entity
// @Getter
// @Setter
// @AllArgsConstructor
// @NoArgsConstructor
// public class Cart {
//     @Id
//     @GeneratedValue(strategy = GenerationType.AUTO)
//     private Long Id;

//     // Hide user when serializing Cart to JSON to prevent circular serialization
//     @OneToOne
//     @JsonIgnore
//     private User user;

//     @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
//     private Set<CartItem> cartItems = new HashSet<>();

//     private double totalSellingPrice;
//     private int totalItem;
//     private double totalMrpPrice;
//     private int discount;
//     private String couponCode;
// }



@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    @OneToOne
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CartItem> cartItems = new HashSet<>();

    private double totalSellingPrice;
    private double totalMrpPrice;
    private double discount;   // ⭐ Make this double, not int
    private int totalItem;
    private String couponCode;



     // base discount amount (MRP - sellingPriceBeforeCoupon)
    private double baseDiscountAmount;

    // coupon discount amount applied on top of base discount
    private double couponDiscountAmount;

}




