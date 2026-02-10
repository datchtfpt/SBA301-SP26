package fu.se.chapter16jwt.controllers;


import fu.se.chapter16jwt.dtos.LoginUserDTO;
import fu.se.chapter16jwt.dtos.RegisterUserDTO;
import fu.se.chapter16jwt.entities.Users;
import fu.se.chapter16jwt.responses.LoginResponse;
import fu.se.chapter16jwt.services.AuthenticationService;
import fu.se.chapter16jwt.services.JwtService;
import jakarta.servlet.Registration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Users> signup(@RequestBody RegisterUserDTO registerUserDTO) {
        Users registeredUser = authenticationService.signUp(registerUserDTO);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginUserDTO loginUserDTO) {
        Users authenticatedUser = authenticationService.authenticate(loginUserDTO);

        String token = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse().setToken(token).setExpiresIn(jwtService.getJwtExpiration());
        return ResponseEntity.ok(loginResponse);
    }
}
