package fu.se.a3lethanhdat_se18d04.services;

import fu.se.a3lethanhdat_se18d04.pojos.Customer;
import fu.se.a3lethanhdat_se18d04.repositories.ICustomerRepository;
import fu.se.a3lethanhdat_se18d04.enums.CustomerStatus;
import fu.se.a3lethanhdat_se18d04.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServicelmpl implements CustomerService {

    @Autowired
    private ICustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Customer> searchByName(String name) {
        return customerRepository.findByFullNameContainingIgnoreCase(name);
    }

    @Override
    public List<Customer> searchByTelephone(String telephone) {
        return customerRepository.findByTelephoneContaining(telephone);
    }

    @Override
    public Customer findByEmail(String emailAddress) {
        return customerRepository.findByEmailAddress(emailAddress).orElse(null);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Optional<Customer> getCustomerById(Integer id) {
        return customerRepository.findById(id);
    }

    @Override
    public Customer createCustomer(Customer customer) {
        if (customerRepository.findByEmailAddress(customer.getEmailAddress()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        customer.setStatus(CustomerStatus.ACTIVE);
        customer.setRole(Role.CUSTOMER);
        return customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(Integer id, Customer customerDetails) {
        Customer customer = customerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Customer not found"));

        customer.setFullName(customerDetails.getFullName());
        customer.setTelephone(customerDetails.getTelephone());
        customer.setBirthday(customerDetails.getBirthday());
        
        if (customerDetails.getPassword() != null && !customerDetails.getPassword().isEmpty()) {
            customer.setPassword(passwordEncoder.encode(customerDetails.getPassword()));
        }

        return customerRepository.save(customer);
    }

    @Override
    public void deleteCustomer(Integer id) {
        Customer customer = customerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        customer.setStatus(CustomerStatus.DELETED);
        customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomerStatus(Integer id, String status) {
        Customer customer = customerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        customer.setStatus(CustomerStatus.valueOf(status.toUpperCase()));
        return customerRepository.save(customer);
    }
}
