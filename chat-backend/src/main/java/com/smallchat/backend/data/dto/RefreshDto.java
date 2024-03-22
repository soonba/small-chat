package com.smallchat.backend.data.dto;

import com.smallchat.backend.data.jwt.Tokens;

public class RefreshDto {

    public record Request(String refreshToken) {

    }

    public record Response(Tokens tokens) {

    }
}
