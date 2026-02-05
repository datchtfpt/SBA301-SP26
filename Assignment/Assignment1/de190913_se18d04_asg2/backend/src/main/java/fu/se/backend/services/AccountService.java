package fu.se.backend.services;

import fu.se.backend.pojos.Account;
import fu.se.backend.repositories.IAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService implements IAccountService {

    @Autowired
    private IAccountRepository repository;

    @Override
    public Account createAccount(Account account) {
        return repository.save(account);
    }

    @Override
    public Account updateAccount(Integer id, Account account) {
        Account oldAccount = getAccount(id);
        oldAccount.setAccountName(account.getAccountName());
        oldAccount.setAccountEmail(account.getAccountEmail());
        oldAccount.setAccountPassword(account.getAccountPassword());
        return repository.save(oldAccount);
    }

    @Override
    public Account getAccount(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Account> getAccounts() {
        return repository.findAll();
    }

    @Override
    public ResponseEntity<String> deleteAccount(Integer id) {
        Account account = getAccount(id);
        if (account == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        repository.delete(account);
        return new ResponseEntity<>("Account deleted", HttpStatus.OK);
    }

}
