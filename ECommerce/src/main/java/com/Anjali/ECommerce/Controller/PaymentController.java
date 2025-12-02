package com.Anjali.ECommerce.Controller;

import com.Anjali.ECommerce.Model.*;
import com.Anjali.ECommerce.Service.*;
import com.Anjali.ECommerce.response.ApiResponse;
import com.Anjali.ECommerce.response.PaymentLinkResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentService paymentService;
    private final UserService userService;
    private final SellerService sellerService;
    private final SellerReportService sellerReportService;
    private final TransactionService transactionService;

    // Handler for successful payments
    @GetMapping("/{paymentId}")
    public ResponseEntity<ApiResponse> paymentSuccessfulHandler(
            @PathVariable String paymentId,
            @RequestParam String paymentLinkId,
            @RequestHeader("Authorization") String jwt) throws Exception{

        // Get user from JWT
        User user = userService.findUserByJwtToken(jwt);

        // Fetch payment order using payment link ID
        PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentLinkId);

        // Process the payment
        boolean paymentSuccess = paymentService.proceedPaymentOrder(
                paymentOrder,
                paymentId,
                paymentLinkId
        );

        // If payment is successful, create transactions and update seller reports
        if(paymentSuccess){
            for(Order order : paymentOrder.getOrders()){
                // Create a transaction record for the order
                transactionService.createTransaction(order);

                // Update seller report
                Seller seller = sellerService.getSellerById(order.getSellerId());
                SellerReport report = sellerReportService.getSellerReport(seller);
                report.setTotalOrders(report.getTotalOrders()+1);
                report.setTotalEarnings(report.getTotalEarnings()+order.getTotalSellingPrice());
                report.setTotalSales(report.getTotalSales()+order.getOrderItems().size());
                sellerReportService.updateSellerReport(report);
            }
        }

        // Return API response
        ApiResponse res = new ApiResponse();
        res.setMessage("Payment Successful");

        return new  ResponseEntity<>(res, HttpStatus.CREATED);
    }
}
