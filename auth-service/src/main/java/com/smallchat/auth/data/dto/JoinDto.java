package com.smallchat.auth.data.dto;

import com.smallchat.auth.data.jwt.Tokens;

public class JoinDto {
    public record Request(String userId, String nickname, String password) {
    }

    public record Response(Tokens tokens) {
    }
}
