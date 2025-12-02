package com.Anjali.ECommerce.Service;

import com.Anjali.ECommerce.Model.Address;
import com.Anjali.ECommerce.Model.User;
import com.Anjali.ECommerce.Repository.AddressRepository;
import com.Anjali.ECommerce.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    // Save address and attach to user
    public Address addAddress(User user, Address address) {
        Address saved = addressRepository.save(address);
        // ensure user's address set exists
        if (user.getAddresses() == null) {
            user.setAddresses(new java.util.HashSet<>());
        }
        user.getAddresses().add(saved);
        userRepository.save(user);
        return saved;
    }

    // Return user's addresses as list
    public List<Address> getUserAddresses(User user) {
        if (user.getAddresses() == null) return java.util.Collections.emptyList();
        return user.getAddresses().stream().toList();
    }
}
