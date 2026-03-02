package fu.se.a3lethanhdat_se18d04.services;

import fu.se.a3lethanhdat_se18d04.pojos.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerService {

    List<Customer> searchByName(String name);

    List<Customer> searchByTelephone(String telephone);

    Customer findByEmail(String emailAddress);

    // Additional methods for CRUD operations
    List<Customer> getAllCustomers();
    Optional<Customer> getCustomerById(Integer id);
    Customer createCustomer(Customer customer);
    Customer updateCustomer(Integer id, Customer customerDetails);
    void deleteCustomer(Integer id);
    Customer updateCustomerStatus(Integer id, String status);
}
