package com.Anjali.ECommerce.Service.Impl;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.Anjali.ECommerce.Domain.OrderStatus;
import com.Anjali.ECommerce.Domain.PaymentStatus;
import com.Anjali.ECommerce.Model.Address;
import com.Anjali.ECommerce.Model.Cart;
import com.Anjali.ECommerce.Model.CartItem;
import com.Anjali.ECommerce.Model.Order;
import com.Anjali.ECommerce.Model.OrderItem;
import com.Anjali.ECommerce.Model.User;
import com.Anjali.ECommerce.Repository.AddressRepository;
import com.Anjali.ECommerce.Repository.OrderItemRepositry;
import com.Anjali.ECommerce.Repository.OrderRepository;
import com.Anjali.ECommerce.Service.OrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    // Repository for CRUD operations on Orders
    private final OrderRepository orderRepository;

    // Repository for CRUD operations on Addresses
    private final AddressRepository addressRepository;

    // Repository for CRUD operations on OrderItems
    private final OrderItemRepositry orderItemRepositry;

    /**
     * Create orders from a user's cart.
     * Groups cart items by seller and creates separate orders for each seller.
     */
    @Override
    public Set<Order> createOrder(User user, Address shippingAddress, Cart cart) {
        // Add shipping address to user's addresses if not already present
        if(!user.getAddresses().contains(shippingAddress)) {
            user.getAddresses().add(shippingAddress);
        }
        Address address = addressRepository.save(shippingAddress);

        // Group cart items by seller ID
        Map<Long, List<CartItem>> itemsBySeller = cart.getCartItems().stream()
                .collect(Collectors.groupingBy(item -> item.getProduct().getSeller().getId()));

        Set<Order> orders = new HashSet<>();

        // Create orders for each seller
        for(Map.Entry<Long, List<CartItem>> entry : itemsBySeller.entrySet()) {
            Long sellerId = entry.getKey();
            List<CartItem> items = entry.getValue();

            // Calculate total price and total items for the order
            int totalOrderPrice = items.stream().mapToInt(CartItem::getSellingPrice).sum();
            int totalItem = items.stream().mapToInt(CartItem::getQuantity).sum();

            // Create new order
            Order createdOrder = new Order();
            createdOrder.setUser(user);
            createdOrder.setSellerId(sellerId);
            createdOrder.setTotalMrpPrice(totalOrderPrice);
            createdOrder.setTotalSellingPrice(totalOrderPrice);
            createdOrder.setTotalItem(totalItem);
            createdOrder.setShippingAddress(address);
            createdOrder.setOrderStatus(OrderStatus.PENDING);
            createdOrder.getPaymentDetails().setPaymentStatus(PaymentStatus.PENDING);

            Order savedOrder = orderRepository.save(createdOrder);
            orders.add(savedOrder);

            // Create order items for each cart item
            for(CartItem item : items) {
                OrderItem orderItem = new OrderItem();
                orderItem.setProduct(item.getProduct());
                orderItem.setQuantity(item.getQuantity());
                orderItem.setMrpPrice(item.getMrpPrice());
                orderItem.setSellingPrice(item.getSellingPrice());
                orderItem.setSize(item.getSize());
                orderItem.setUserId(item.getUserId());


                orderItem.setOrder(savedOrder);

                // Associate order item with the order
                savedOrder.getOrderItems().add(orderItem);

                orderItemRepositry.save(orderItem);
            }
            cart.getCartItems().clear();
        }
        return orders;
    }

    /**
     * Find an order by its ID.
     */
    @Override
    public Order findOrderById(long id) throws Exception {
        return orderRepository.findById(id).orElseThrow(() ->
                new Exception("Order not found"));
    }

    /**
     * Retrieve all orders for a specific user.
     */
    @Override
    public List<Order> usersOrderHistory(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    /**
     * Retrieve all orders for a specific seller.
     */
    @Override
    public List<Order> sellerOrders(Long sellerId) {
        return orderRepository.findBySellerId(sellerId);
    }

    /**
     * Update the status of an order.
     */
    @Override
    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception {
        Order order = findOrderById(orderId);
        order.setOrderStatus(orderStatus);
        return orderRepository.save(order);
    }

    /**
     * Cancel an order if the requesting user is the owner.
     */
    @Override
    public Order cancelOrder(Long orderId, User user) throws Exception {
        Order order = findOrderById(orderId);

        if(!user.getId().equals(order.getUser().getId())){
            throw new Exception("You don't have access to this Order");
        }

        order.setOrderStatus(OrderStatus.CANCELED);
        return orderRepository.save(order);
    }

    /**
     * Find an order item by its ID.
     */
    @Override
    public OrderItem getOrderItemById(Long id) throws Exception {
        return orderItemRepositry.findById(id).orElseThrow(() ->
                new Exception("Order Item doesn't Exist"));
    }
}
