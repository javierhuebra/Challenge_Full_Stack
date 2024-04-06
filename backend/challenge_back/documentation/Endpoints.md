# Endpoints Documentation
This document describes the endpoints that are available in the API for the phase 1.


## Users

---
### - Create User
- Description: Create a new user
- Method: POST
- EP: ``http://localhost:8080/api/users``
- Headers: ``none``
- Path Params: ``none``
- Path Variables: ``none``
- Body: 
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "password": "123456"
}
```
### - Login
- Description: Create a new user
- Method: POST
- EP: ``http://localhost:8080/login``
- Headers: ``none``
- Path Params: ``none``
- Path Variables: ``none``
- Body:
```json
{
  "username": "pedro",
  "password": "123456"
}
```

## Notes

---

### - Create Note
- Description: Create a new note
- Method: POST
- EP: ``http://localhost:8080/api/notes``
- Headers: Custom Token
``"Authorization: Token"``
- Path Params: ``none``
- Path Variables: ``none``
- Body:
```json
{
  "title": "My new note",
  "description": "Remember drink water",
  "archived": false,
  "active": true,
  "categoriesIds": [1,2]
}
```
### - Update Note
- Description: Update note
- Method: POST
- EP: ``http://localhost:8080/api/notes/{note_id}``
- Headers: Custom Token
  ``"Authorization: Token"``
- Path Params: ``none``
- Path Variables:
  - ``note_id``: The id of the note
- Body:
```json
{
  "title": "Modified title",
  "description": "Modified description",
  "archived": false,
  "active": true,
  "categoriesIds": [1,2]
}
```
### - Delete Note
- Description: Delete note by id
- Method: DELETE
- EP: ``http://localhost:8080/api/notes/{note_id}``
- Headers: Custom Token
  ``"Authorization: Token"``
- Path Params: ``none``
- Path Variables:
    - ``note_id``: The id of the note
- Body: ``none``
### - Get Note
- Description: Get a note by id
- Method: GET
- EP: ``http://localhost:8080/api/notes/{note_id}``
- Headers: Custom Token
  ``"Authorization: Token"``
- Path Params: ``none``
- Path Variables: 
  - ``note_id``: The id of the note
- Body: ``none``
### - Get All Notes
- Description: Get all notes
- Method: GET
- EP: ``http://localhost:8080/api/notes/all/{note_id}``
- Headers: Custom Token
  ``"Authorization: Token"``
- Path Params: ``none``
- Path Variables:
    - ``note_id``: The id of the note
- Body: ``none``

### - Get Filtered Notes
- Description: Get all notes filtered by an archived or active status
- Method: GET
- EP: ``http://localhost:8080/api/notes/filtered/{note_id}?archived=false&active=true``
- Headers: Custom Token
  ``"Authorization: Token"``
- Path Params: ``archived`` and ``active`` are query parameters
- Path Variables:
    - ``note_id``: The id of the note
- Body: ``none``
---







