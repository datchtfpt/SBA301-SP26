package fu.se.a3lethanhdat_se18d04.controller;

import fu.se.a3lethanhdat_se18d04.dto.AuthenticationRequest;
import fu.se.a3lethanhdat_se18d04.dto.AuthenticationResponse;
import fu.se.a3lethanhdat_se18d04.dto.RegisterRequest;
import fu.se.a3lethanhdat_se18d04.enums.CustomerStatus;
import fu.se.a3lethanhdat_se18d04.enums.Role;
import fu.se.a3lethanhdat_se18d04.pojos.Customer;
import fu.se.a3lethanhdat_se18d04.security.JwtTokenUtil;
import fu.se.a3lethanhdat_se18d04.services.CustomerService;
import fu.se.a3lethanhdat_se18d04.repositories.ICustomerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ICustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private boolean isBcryptHash(String value) {
        if (value == null) return false;
        return value.startsWith("$2a$") || value.startsWith("$2b$") || value.startsWith("$2y$");
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            log.info("Login attempt for user: {}", authenticationRequest.getUsername());
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(),
                    authenticationRequest.getPassword()
                )
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwt = jwtTokenUtil.generateToken(userDetails);

            return ResponseEntity.ok(new AuthenticationResponse(jwt));
        } catch (BadCredentialsException e) {
            String username = authenticationRequest.getUsername();
            String rawPassword = authenticationRequest.getPassword();

            Customer customer = customerService.findByEmail(username);
            if (customer == null || customer.getStatus() != CustomerStatus.ACTIVE) {
                log.warn("Invalid credentials for user: {}", username);
                return ResponseEntity.badRequest().body("Invalid credentials");
            }

            String stored = customer.getPassword();
            boolean ok;
            if (isBcryptHash(stored)) {
                ok = passwordEncoder.matches(rawPassword, stored);
            } else {
                ok = stored != null && stored.equals(rawPassword);
                if (ok) {
                    String encoded = passwordEncoder.encode(rawPassword);
                    customer.setPassword(encoded);
                    customerRepository.save(customer);
                    stored = encoded;
                }
            }

            if (!ok) {
                log.warn("Invalid credentials for user: {}", username);
                return ResponseEntity.badRequest().body("Invalid credentials");
            }

            UserDetails userDetails = User.builder()
                    .username(customer.getEmailAddress())
                    .password(stored)
                    .roles(customer.getRole().name())
                    .build();

            String jwt = jwtTokenUtil.generateToken(userDetails);
            return ResponseEntity.ok(new AuthenticationResponse(jwt));
        } catch (Exception e) {
            log.error("Login error for user: {}", authenticationRequest.getUsername(), e);
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody RegisterRequest registerRequest) {
        try {
            // Check if customer already exists
            Customer existingCustomer = customerService.findByEmail(registerRequest.getEmailAddress());
            if (existingCustomer != null) {
                return ResponseEntity.badRequest().body("Email already registered");
            }

            // Create new customer
            Customer customer = new Customer();
            customer.setFullName(registerRequest.getFullName());
            customer.setTelephone(registerRequest.getTelephone());
            customer.setEmailAddress(registerRequest.getEmailAddress());
            customer.setBirthday(registerRequest.getBirthday());
            customer.setPassword(registerRequest.getPassword());
            customer.setStatus(CustomerStatus.ACTIVE);
            customer.setRole(Role.CUSTOMER);

            customerService.createCustomer(customer);

            return ResponseEntity.ok("Registration successful");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationTokenLegacy(@RequestBody AuthenticationRequest authenticationRequest) {
        return createAuthenticationToken(authenticationRequest);
    }
}
