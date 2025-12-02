package com.Anjali.ECommerce.Service.Impl;

import com.Anjali.ECommerce.Model.Deal;
import com.Anjali.ECommerce.Model.HomeCategory;
import com.Anjali.ECommerce.Repository.DealRepository;
import com.Anjali.ECommerce.Repository.HomeCategoryRepository;
import com.Anjali.ECommerce.Service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DealServiceImpl implements DealService {

    // Repository for CRUD operations on Deal
    private final DealRepository dealRepository;

    // Repository to fetch HomeCategory data
    private final HomeCategoryRepository homeCategoryRepository;

    /**
     * Get all deals.
     */
    @Override
    public List<Deal> getDeals() {
        return dealRepository.findAll();
    }

    /**
     * Create a new deal.
     * Associates the deal with a category and saves it.
     */
    @Override
    public Deal createDeal(Deal deal) {
        // Fetch category if it exists
        HomeCategory category = homeCategoryRepository.findById(deal.getCategory().getId()).orElse(null);

        // Save new deal
        Deal newDeal = dealRepository.save(deal);
        newDeal.setCategory(category);
        newDeal.setDiscount(deal.getDiscount());

        // Save updated deal with category
        return dealRepository.save(newDeal);
    }

    /**
     * Update an existing deal by ID.
     * Updates discount and category if provided.
     */
    @Override
    public Deal updateDeal(Deal deal, Long id) throws Exception {
        Deal existingDeal  = dealRepository.findById(id).orElse(null);
        HomeCategory category  = homeCategoryRepository.findById(deal.getCategory().getId()).orElse(null);

        if(existingDeal != null){
            if(deal.getDiscount() != null){
                existingDeal.setDiscount(deal.getDiscount());
            }
            if(category != null){
                existingDeal.setCategory(category);
            }
            return dealRepository.save(existingDeal);
        }

        // Throw exception if deal does not exist
        throw new Exception("Deal not found");
    }

    /**
     * Delete a deal by ID.
     */
    @Override
    public void deleteDeal(Long id) throws Exception {
        Deal deal = dealRepository.findById(id).orElseThrow(() ->
                new Exception("Deal not found"));
        dealRepository.delete(deal);
    }
}
