package com.notes_app.challenge.security;



public class PasswordEncoder {
    public static String encode(String password) {
        return String.valueOf(password.hashCode());
    }
    public static boolean matches(String password, String encodedPassword) {
        return encodedPassword.equals(String.valueOf(password.hashCode()));
    }
}
