package com.notes_app.challenge.services;

import com.notes_app.challenge.dtos.LoginDTO;
import com.notes_app.challenge.models.User;
import com.notes_app.challenge.repositories.UserRepository;
import com.notes_app.challenge.security.PasswordEncoder;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@AllArgsConstructor
public class LoginService {
    private final UserRepository userRepository;
    public Map<String,String> login(LoginDTO loginDTO) {
        String username = loginDTO.getUsername();
        String password = loginDTO.getPassword();
        User user = this.userRepository.findByUsername(username).orElseThrow(() ->
                new RuntimeException("Invalid credentials")
        );
        if(PasswordEncoder.matches(password, user.getPassword())) {
            return Map.of("id",String.valueOf(user.getId()),"token", user.getToken(), "name", user.getName());
        }else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
