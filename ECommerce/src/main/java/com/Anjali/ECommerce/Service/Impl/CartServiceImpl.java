package com.Anjali.ECommerce.Service.Impl;

import com.Anjali.ECommerce.Model.Cart;
import com.Anjali.ECommerce.Model.CartItem;
import com.Anjali.ECommerce.Model.Product;
import com.Anjali.ECommerce.Model.User;
import com.Anjali.ECommerce.Repository.CartItemRepository;
import com.Anjali.ECommerce.Repository.CartRepository;
import com.Anjali.ECommerce.Service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    // Repository for Cart CRUD operations
    private final CartRepository  cartRepository;

    // Repository for CartItem CRUD operations
    private final CartItemRepository cartItemRepository;

    /**
     * Add a product to the user's cart.
     * If the product with the same size already exists, returns the existing cart item.
     * Otherwise, creates a new cart item and updates prices.
     */
    @Override
    public CartItem addCartItem(User user, Product product, String size, int quantity) {
        Cart cart = findUserCart(user);

        // Check if the product of same size is already in the cart
        CartItem isPresent = cartItemRepository.findByCartAndProductAndSize(cart, product, size);

        if(isPresent == null){
            // Create a new cart item
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setUserId(user.getId());
            cartItem.setSize(size);

            // Calculate total prices
            int totalPrice = quantity * product.getSellingPrice();
            cartItem.setSellingPrice(totalPrice);
            cartItem.setMrpPrice(quantity * product.getMrpPrice());

            // Associate cart item with cart
            cart.getCartItems().add(cartItem);
            cartItem.setCart(cart);

            // Save and return the new cart item
            return cartItemRepository.save(cartItem);
        }

        // Return existing cart item if already present
        return isPresent;
    }

    /**
     * Find the user's cart and update total prices, total items, and discount.
     */
    @Override
    public Cart findUserCart(User user) {
        Cart cart = cartRepository.findByUserId(user.getId());

        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItem = 0;

        // Calculate totals from all cart items
        for(CartItem cartItem : cart.getCartItems()){
            totalPrice += cartItem.getMrpPrice();
            totalDiscountedPrice += cartItem.getSellingPrice();
            totalItem += cartItem.getQuantity();
        }

        // Update cart totals
        cart.setTotalMrpPrice(totalPrice);
        cart.setTotalItem(totalItem);
        cart.setTotalSellingPrice(totalDiscountedPrice);
        cart.setDiscount(calculateDiscountpercentage(totalPrice, totalDiscountedPrice));
        cart.setTotalItem(totalItem);

        return cart;
    }

    /**
     * Calculate discount percentage from MRP and selling price.
     */
    private int calculateDiscountpercentage(int mrpPrice, int sellingPrice) {
        if(mrpPrice <= 0){
            return 0;
        }
        double discount = mrpPrice - sellingPrice;
        double discountPercentage = (discount / mrpPrice) * 100;
        return (int) discountPercentage;
    }

}
