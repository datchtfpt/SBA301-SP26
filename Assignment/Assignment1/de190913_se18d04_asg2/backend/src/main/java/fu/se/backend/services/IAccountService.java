package fu.se.backend.services;

import fu.se.backend.pojos.Account;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IAccountService {

    public Account createAccount(Account account);

    public Account updateAccount(Integer id, Account account);

    public Account getAccount(Integer id);

    public List<Account> getAccounts();

    public ResponseEntity<String> deleteAccount(Integer id);
}
