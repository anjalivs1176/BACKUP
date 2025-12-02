package com.Anjali.ECommerce.Repository;

import com.Anjali.ECommerce.Model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository  extends JpaRepository<Address,Long> {
}
