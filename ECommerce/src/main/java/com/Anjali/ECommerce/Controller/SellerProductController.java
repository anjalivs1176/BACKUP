package com.Anjali.ECommerce.Controller;

import com.Anjali.ECommerce.Model.Product;
import com.Anjali.ECommerce.Model.Seller;
import com.Anjali.ECommerce.Request.CreateProductRequest;
import com.Anjali.ECommerce.Service.ProductService;
import com.Anjali.ECommerce.Service.SellerService;
import com.Anjali.ECommerce.exception.ProductException;
import com.Anjali.ECommerce.exception.SellerException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers/products")
public class SellerProductController {

    private final ProductService productService;
    private final SellerService sellerService;

    // Get all products of the logged-in seller
    @GetMapping
    public ResponseEntity<List<Product>> getProductBySellerId(
            @RequestHeader("Authorization") String jwt) throws Exception, ProductException, SellerException {

        Seller seller = sellerService.getSellerProfile(jwt); // Get the seller from JWT token
        List<Product> products = productService.getProductBySellerId(seller.getId()); // Fetch products of this seller
        return new ResponseEntity<>(products, HttpStatus.OK); // Return products list with OK status
    }

    // Create a new product for the logged-in seller
    @PostMapping
    public ResponseEntity<Product> createProduct(
            @RequestBody CreateProductRequest request,
            @RequestHeader("Authorization") String jwt) throws Exception {

        Seller seller = sellerService.getSellerProfile(jwt); // Get the seller from JWT
        Product product = productService.createProduct(request, seller); // Create product associated with seller
        return new ResponseEntity<>(product, HttpStatus.CREATED); // Return created product with CREATED status
    }

    // Delete a product (only if it belongs to the logged-in seller)
    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId,
                                              @RequestHeader("Authorization") String jwt) throws Exception {
        try {
            Seller seller = sellerService.getSellerProfile(jwt); // Get logged-in seller

            Product product = productService.findProductById(productId); // Fetch the product
            if(!product.getSeller().getId().equals(seller.getId())) { // Check if seller owns the product
                return new ResponseEntity<>(HttpStatus.FORBIDDEN); // Return 403 if not owner
            }

            productService.deleteProduct(productId); // Proceed to delete if ownership matches
            return new ResponseEntity<>(HttpStatus.OK); // Return OK after deletion

        } catch(ProductException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return 404 if product not found
        }
    }

    // Update a product (only if it belongs to the logged-in seller)
    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId,
                                                 @RequestBody Product product,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {

        Seller seller = sellerService.getSellerProfile(jwt); // Get logged-in seller
        Product existingProduct = productService.findProductById(productId); // Fetch the existing product

        if(!existingProduct.getSeller().getId().equals(seller.getId())) { // Check ownership
            return new ResponseEntity<>(HttpStatus.FORBIDDEN); // Return 403 if not owner
        }

        Product updatedProduct = productService.updateProduct(productId, product); // Update product if owner
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK); // Return updated product with OK status
    }
}
