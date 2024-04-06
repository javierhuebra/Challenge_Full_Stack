package com.notes_app.challenge.controllers;

import com.notes_app.challenge.dtos.CategoryDTO;
import com.notes_app.challenge.services.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;


    @PostMapping
    public ResponseEntity<?> create(@RequestBody CategoryDTO categoryDTO, @RequestHeader("Authorization") String token) {
        try {
            return ResponseEntity.ok(this.categoryService.createCategory(categoryDTO, token));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<?> getAll(@PathVariable String userId,@RequestHeader("Authorization") String token) {
        try {
            return ResponseEntity.ok(this.categoryService.getAllUserCategories(Long.valueOf(userId), token));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }







}
