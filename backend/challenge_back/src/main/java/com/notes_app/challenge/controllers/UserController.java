package com.notes_app.challenge.controllers;


import com.notes_app.challenge.dtos.UserDTO;
import com.notes_app.challenge.repositories.UserRepository;
import com.notes_app.challenge.security.TokenGenerator;
import com.notes_app.challenge.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO) {
        try{
            this.userService.saveUser(userDTO);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("Error",e.getMessage()));
        }

    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getUsers(@PathVariable Long id) {

                return ResponseEntity.ok(
                        Map.of("El token tiene este id", "Asdadasd")
                );



    }
}
