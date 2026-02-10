package fu.se.chapter16jwt.services;

import fu.se.chapter16jwt.dtos.LoginUserDTO;
import fu.se.chapter16jwt.dtos.RegisterUserDTO;
import fu.se.chapter16jwt.entities.Users;
import fu.se.chapter16jwt.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public Users signUp(RegisterUserDTO input) {
        var user = new Users().setFullName(input.getFullName()).setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));

        return userRepository.save(user);
    }

    public Users authenticate(LoginUserDTO input) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));
        return userRepository.findByEmail(input.getEmail()).orElseThrow();
    }


    public List<Users> findAll() {
        List<Users> users =  new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }



}
