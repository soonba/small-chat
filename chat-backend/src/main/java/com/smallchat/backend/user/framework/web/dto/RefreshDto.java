package com.smallchat.backend.user.framework.web.dto;


import com.smallchat.backend.global.utils.Tokens;

public class RefreshDto {

    public record Request(String refreshToken) {

    }

    public record Response(Tokens tokens) {

    }
}
