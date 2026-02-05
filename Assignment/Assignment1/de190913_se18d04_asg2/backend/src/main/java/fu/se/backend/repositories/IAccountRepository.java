package fu.se.backend.repositories;

import fu.se.backend.pojos.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAccountRepository extends JpaRepository<Account,Integer> {

}
