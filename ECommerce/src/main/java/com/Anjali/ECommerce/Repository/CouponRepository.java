package com.Anjali.ECommerce.Repository;

import com.Anjali.ECommerce.Model.Coupons;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouponRepository extends JpaRepository<Coupons, Long> {

    Coupons findByCode(String code);
}
