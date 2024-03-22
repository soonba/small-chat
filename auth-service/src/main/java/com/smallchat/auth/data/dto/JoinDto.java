package com.smallchat.auth.data.dto;

import com.smallchat.auth.data.jwt.Tokens;

public class JoinDto {
    public record Request(String accountId, String nickname, String password) {
    }

    public record Response(Tokens tokens) {
    }
}
