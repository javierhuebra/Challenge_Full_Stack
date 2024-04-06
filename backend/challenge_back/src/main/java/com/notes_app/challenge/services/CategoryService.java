package com.notes_app.challenge.services;

import com.notes_app.challenge.dtos.CategoryDTO;


import com.notes_app.challenge.models.Category;
import com.notes_app.challenge.models.Note;
import com.notes_app.challenge.models.User;
import com.notes_app.challenge.repositories.CategoryRepository;
import com.notes_app.challenge.repositories.NoteRepository;
import com.notes_app.challenge.repositories.UserRepository;
import com.notes_app.challenge.security.TokenGenerator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@AllArgsConstructor
public class CategoryService {
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    public Map<String,String> createCategory(CategoryDTO categoryDTO, String token) {
        User user = this.userRepository.findById(TokenGenerator.decodeId(token)).orElseThrow(
                () -> new RuntimeException("Missing Token")
        );
        if (categoryDTO.getTitle() == null) {
            throw new RuntimeException("Title is required");
        }
        Category category = new Category();
        category.setUser(user);
        category.setTitle(categoryDTO.getTitle());

        this.categoryRepository.save(category);
        return Map.of("Message","Category created", "id", String.valueOf(category.getId()));
    }

    public List<Category> getAllUserCategories(Long userId, String token) {
        User user = this.userRepository.findById(TokenGenerator.decodeId(token)).orElseThrow(
                () -> new RuntimeException("Missing Token")
        );
        if(!Objects.equals(userId, user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        return this.categoryRepository.findAllByUserId(user.getId());
    }
}
