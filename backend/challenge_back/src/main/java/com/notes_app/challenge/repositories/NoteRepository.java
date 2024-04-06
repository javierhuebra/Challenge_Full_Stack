package com.notes_app.challenge.repositories;

import com.notes_app.challenge.models.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findAllByUserId(Long userId);
    List<Note> findAllByUserIdAndArchivedAndActive(Long userId, boolean archived, boolean active);
    List<Note> findAllByUserIdAndActive(Long userId, boolean active);
}
