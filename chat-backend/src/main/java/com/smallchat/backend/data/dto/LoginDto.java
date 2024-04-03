package com.smallchat.backend.data.dto;

import com.smallchat.backend.data.jwt.Tokens;

public class LoginDto {
    public record Request(String accountId, String password) {
    }

    public record Response(Tokens tokens) {
    }
}
