package com.smallchat.backend.data.dto;

import com.smallchat.backend.data.jwt.Tokens;

public class JoinDto {
    public record Request(String accountId, String nickname, String password) {
    }

    public record Response(Tokens tokens) {
    }
}
