package com.Anjali.ECommerce.Repository;

import com.Anjali.ECommerce.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface  CategoryRepository extends JpaRepository<Category,Long> {

    Category findByCategoryId(String categoryId);
}
