package com.notes_app.challenge.security;

import java.util.Base64;

public class TokenGenerator {
    public static String encodeId(Long id) {
        String idToString = String.valueOf(id);
        return Base64.getEncoder().encodeToString(idToString.getBytes());
    }
    public static Long decodeId(String token) {
        try{
            byte[] decodedBytes = Base64.getDecoder().decode(token);
            String decodedString = new String(decodedBytes);
            return Long.parseLong(decodedString);
        }catch (Exception e) {
            throw new RuntimeException("Invalid token");
        }

    }
}
