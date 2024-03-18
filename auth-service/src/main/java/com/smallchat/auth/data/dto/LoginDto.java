package com.smallchat.auth.data.dto;

import com.smallchat.auth.data.jwt.Tokens;

public class LoginDto {
    public record Request(String userId, String password) {
    }

    public record Response(Tokens tokens) {
    }
}
