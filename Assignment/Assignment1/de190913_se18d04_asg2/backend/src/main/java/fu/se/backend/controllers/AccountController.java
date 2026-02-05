package fu.se.backend.controllers;


import fu.se.backend.pojos.Account;
import fu.se.backend.services.AccountService;
import fu.se.backend.services.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private IAccountService service;

    // Helper method to check if user is Admin
    private boolean isAdmin(Integer userRole) {
        return userRole != null && userRole == 1;
    }

    @GetMapping()
    public ResponseEntity<?> getAccounts(@RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isAdmin(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Admin role required.");
        }
        return ResponseEntity.ok(service.getAccounts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAccount(@PathVariable Integer id, @RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isAdmin(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Admin role required.");
        }
        return ResponseEntity.ok(service.getAccount(id));
    }

    @PostMapping
    public ResponseEntity<?> createAccount(@RequestBody Account account, @RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isAdmin(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Admin role required.");
        }
        return ResponseEntity.ok(service.createAccount(account));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable Integer id, @RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isAdmin(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Admin role required.");
        }
        return service.deleteAccount(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable Integer id, @RequestBody Account account, @RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isAdmin(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Admin role required.");
        }
        return ResponseEntity.ok(service.updateAccount(id, account));
    }

}
