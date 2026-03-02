package fu.se.a3lethanhdat_se18d04.repositories;

import fu.se.a3lethanhdat_se18d04.pojos.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ICustomerRepository extends JpaRepository<Customer, Integer> {

    List<Customer> findByFullNameContainingIgnoreCase(String name);

    List<Customer> findByTelephoneContaining(String telephone);

    Optional<Customer> findByEmailAddress(String emailAddress);



}
