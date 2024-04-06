package com.notes_app.challenge.controllers;

import com.notes_app.challenge.dtos.NoteDTO;
import com.notes_app.challenge.services.NoteService;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/notes")
public class NoteController {
    private final NoteService noteService;


    @PostMapping
    public ResponseEntity<?> create(@RequestBody NoteDTO noteDTO, @RequestHeader("Authorization") String token) {
        try {
            return ResponseEntity.ok(this.noteService.create(noteDTO, token));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        try {
            return ResponseEntity.ok(this.noteService.getNote(id, token));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody NoteDTO noteDTO, @RequestHeader("Authorization") String token) {
        try {
            return ResponseEntity.ok(this.noteService.update(id, noteDTO, token));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        try {
            return ResponseEntity.ok(this.noteService.delete(id, token));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<?> getAll(@PathVariable String userId,@RequestHeader("Authorization") String token) {
        try {
            return ResponseEntity.ok(this.noteService.getAllUserNotes(Long.valueOf(userId), token));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/filtered/{userId}")
    public ResponseEntity<?> getArchived(@PathVariable String userId,
                                         @RequestHeader("Authorization") String token,
                                         @RequestParam(value = "archived", required = false) boolean archived,
                                         @RequestParam(value = "active", required = false) boolean active ) {
        {
            try {
                return ResponseEntity.ok(
                        this.noteService.getArchivedOrNot(
                                Long.valueOf(userId),
                                token,
                                archived,
                                active));
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
    }



}
