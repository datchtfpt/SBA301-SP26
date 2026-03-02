package fu.se.a3lethanhdat_se18d04.security;

import fu.se.a3lethanhdat_se18d04.enums.Role;
import fu.se.a3lethanhdat_se18d04.pojos.Customer;
import fu.se.a3lethanhdat_se18d04.enums.CustomerStatus;
import fu.se.a3lethanhdat_se18d04.repositories.ICustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

    @Value("${app.staff.username:staff@gmail.com}")
    private String staffUsername;

    @Value("${app.staff.password:staff123}")
    private String staffPassword;

    @Autowired
    private ICustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private String encodedStaffPassword;

    private String getEncodedStaffPassword() {
        if (encodedStaffPassword == null) {
            encodedStaffPassword = passwordEncoder.encode(staffPassword);
        }
        return encodedStaffPassword;
    }

    private boolean isBcryptHash(String value) {
        if (value == null) return false;
        return value.startsWith("$2a$") || value.startsWith("$2b$") || value.startsWith("$2y$");
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Check staff user first
        if (staffUsername.equals(username)) {
            return User.builder()
                    .username(staffUsername)
                    .password(getEncodedStaffPassword())
                    .roles(Role.STAFF.name())
                    .build();
        }
        
        // Check customer
        Customer customer = customerRepository.findByEmailAddress(username).orElse(null);
        if (customer != null && customer.getStatus() == CustomerStatus.ACTIVE) {
            String storedPassword = customer.getPassword();
            if (!isBcryptHash(storedPassword)) {
                String encoded = passwordEncoder.encode(storedPassword == null ? "" : storedPassword);
                customer.setPassword(encoded);
                customerRepository.save(customer);
                storedPassword = encoded;
            }
            return User.builder()
                    .username(customer.getEmailAddress())
                    .password(storedPassword)
                    .roles(customer.getRole().name())
                    .build();
        }
        
        throw new UsernameNotFoundException("User not found: " + username);
    }
}
