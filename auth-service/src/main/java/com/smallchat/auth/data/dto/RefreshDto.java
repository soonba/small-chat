package com.smallchat.auth.data.dto;

import com.smallchat.auth.data.jwt.Tokens;

public class RefreshDto {

    public record Request(String rt) {

    }

    public record Response(Tokens tokens) {

    }
}
