package com.notes_app.challenge.services;

import com.notes_app.challenge.dtos.NoteDTO;
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
public class NoteService {
    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public Map<String,String> create(NoteDTO noteDTO, String token) {
        User user = this.userRepository.findById(TokenGenerator.decodeId(token)).orElseThrow(
                () -> new RuntimeException("Missing Token")
        );
        List<Category> categories = this.categoryRepository.findAllByIdIn(noteDTO.getCategoriesIds());
        if (categories.size() != noteDTO.getCategoriesIds().size()) {
            throw new RuntimeException("Category not found");
        }
        Note note = new Note();
        note.setTitle(noteDTO.getTitle());
        note.setDescription(noteDTO.getDescription());
        note.setArchived(noteDTO.isArchived());
        note.setActive(noteDTO.isActive());
        note.setCategories(categories);

        note.setUser(user);
        this.noteRepository.save(note);
        return Map.of("Message","Note created", "id", String.valueOf(note.getId()));
    }

    public Note getNote(Long id, String token) {
        User user = this.userRepository.findById(TokenGenerator.decodeId(token)).orElseThrow(
                () -> new RuntimeException("Missing Token")
        );
        Note note = this.noteRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Note not found")
        );
        if(!Objects.equals(note.getUser().getId(), user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        return note;
    }

    public Map<String,String> update(Long id, NoteDTO noteDTO, String token) {
        User user = this.userRepository.findById(TokenGenerator.decodeId(token)).orElseThrow(
                () -> new RuntimeException("Missing Token")
        );
        Note note = this.noteRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Note not found")
        );
        if(!Objects.equals(note.getUser().getId(), user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        List<Category> categories = this.categoryRepository.findAllByIdIn(noteDTO.getCategoriesIds());
        if (categories.size() != noteDTO.getCategoriesIds().size()) {
            throw new RuntimeException("Category not found");
        }

        if (noteDTO.getTitle() != null) note.setTitle(noteDTO.getTitle());
        if (noteDTO.getDescription() != null) note.setDescription(noteDTO.getDescription());
        note.setArchived(noteDTO.isArchived());
        note.setActive(noteDTO.isActive());
        note.setCategories(categories);

        this.noteRepository.save(note);

        return Map.of("Message","Note updated with id: " + note.getId());
    }

    public Map<String,String> delete(Long id, String token) {
        User user = this.userRepository.findById(TokenGenerator.decodeId(token)).orElseThrow(
                () -> new RuntimeException("Missing Token")
        );
        Note note = this.noteRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Note not found")
        );
        if(!Objects.equals(note.getUser().getId(), user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        this.noteRepository.deleteById(id);

        return Map.of("Message","Note delete forever with id: " + note.getId());
    }

    public List<Note> getAllUserNotes(Long userId, String token) {
        User user = this.userRepository.findById(TokenGenerator.decodeId(token)).orElseThrow(
                () -> new RuntimeException("Missing Token")
        );
        if(!Objects.equals(userId, user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        return this.noteRepository.findAllByUserId(user.getId());
    }

    public List<Note> getArchivedOrNot(Long userId, String token, boolean isArchived, boolean isActive) {
        User user = this.userRepository.findById(TokenGenerator.decodeId(token)).orElseThrow(
                () -> new RuntimeException("Missing Token")
        );
        if(!Objects.equals(userId, user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        return this.noteRepository.findAllByUserIdAndArchivedAndActive(userId, isArchived, isActive);
    }
}
