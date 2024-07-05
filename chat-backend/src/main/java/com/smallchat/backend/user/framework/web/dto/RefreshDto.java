package com.smallchat.backend.user.framework.web.dto;


import com.smallchat.backend.user.utils.Tokens;

public class RefreshDto {

    public record Request(String refreshToken) {

    }

    public record Response(Tokens tokens) {

    }
}
