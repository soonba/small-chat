package com.smallchat.backend.util;

public class PasswordUtil {

    public static String encrypt(String rawString) {
        // todo encrypt
        return rawString;
    }

    public static void verifying(String encryptString, String rawString) {
        // todo verify password
        if (!encryptString.equals(rawString)) {
            throw new RuntimeException("비밀번호 불일치");
        }
    }
}
