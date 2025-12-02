package com.Anjali.ECommerce.Service.Impl;

import com.Anjali.ECommerce.Domain.HomeCategorySection;
import com.Anjali.ECommerce.Model.Deal;
import com.Anjali.ECommerce.Model.Home;
import com.Anjali.ECommerce.Model.HomeCategory;
import com.Anjali.ECommerce.Repository.DealRepository;
import com.Anjali.ECommerce.Service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {

    // Repository for CRUD operations on Deals
    private final DealRepository dealRepository;

    /**
     * Create home page data by categorizing HomeCategories into different sections.
     * Also fetches or creates deals for the DEALS section.
     */
    @Override
    public Home createHomePageData(List<HomeCategory> allCategories) {

        // Filter categories for GRID section
        List<HomeCategory> gridCategories = allCategories.stream()
                .filter(category ->
                        category.getSection() == HomeCategorySection.GRID)
                .collect(Collectors.toList());

        // Filter categories for SHOP_BY_CATEGORIES section
        List<HomeCategory> shopByCategories = allCategories.stream()
                .filter(category ->
                        category.getSection() == HomeCategorySection.SHOP_BY_CATEGORIES)
                .collect(Collectors.toList());

        // Filter categories for ELECTRIC_CATEGORIES section
        List<HomeCategory> electricCategories = allCategories.stream()
                .filter(category ->
                        category.getSection() == HomeCategorySection.ELECTRIC_CATEGORIES)
                .collect(Collectors.toList());

        // Filter categories for DEALS section
        List<HomeCategory> dealCategories = allCategories.stream()
                .filter(category ->
                        category.getSection() == HomeCategorySection.DEALS)
                .collect(Collectors.toList());

        List<Deal> createDeals = new ArrayList<>();

        // Check if deals exist; if not, create default deals
        if(dealRepository.findAll().isEmpty()){
            List<Deal> deals = allCategories.stream()
                    .filter(category -> category.getSection() == HomeCategorySection.DEALS)
                    .map(category -> new Deal(null, 10, category))
                    .collect(Collectors.toList());
            createDeals = dealRepository.saveAll(deals);
        } else {
            createDeals = dealRepository.findAll();
        }

        // Construct Home object with categorized sections and deals
        Home home = new Home();
        home.setGrid(gridCategories);
        home.setShopByCategories(shopByCategories);
        home.setElectricCategories(electricCategories);
        home.setDeals(createDeals);
        home.setDealCategories(dealCategories);

        return home;
    }
}
