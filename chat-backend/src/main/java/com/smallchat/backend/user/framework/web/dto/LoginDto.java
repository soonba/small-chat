package com.smallchat.backend.user.framework.web.dto;


import com.smallchat.backend.global.utils.Tokens;

public class LoginDto {
    public record Request(String id, String password) {
    }

    public record Response(Tokens tokens) {
    }
}