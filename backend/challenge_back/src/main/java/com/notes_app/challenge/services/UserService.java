package com.notes_app.challenge.services;

import com.notes_app.challenge.dtos.UserDTO;
import com.notes_app.challenge.security.TokenGenerator;
import com.notes_app.challenge.security.PasswordEncoder;
import com.notes_app.challenge.models.User;
import com.notes_app.challenge.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public void saveUser(UserDTO userDTO) {
        try {
            User user = new User();
            user.setName(userDTO.getName());
            user.setUsername(userDTO.getUsername());
            user.setPassword(PasswordEncoder.encode(userDTO.getPassword()));
            user = this.userRepository.save(user);
            user.setToken(TokenGenerator.encodeId(user.getId()));
            this.userRepository.save(user);
        }catch (Exception e) {
            throw new RuntimeException("Error saving user, username already exists or something went wrong");
        }
    }
}
