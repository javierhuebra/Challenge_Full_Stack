package com.notes_app.challenge.dtos;

import lombok.Data;

import java.util.List;

@Data
public class NoteDTO {
    private String title;
    private String description;
    private boolean archived;
    private boolean active;
    private List<Long> categoriesIds;
}
