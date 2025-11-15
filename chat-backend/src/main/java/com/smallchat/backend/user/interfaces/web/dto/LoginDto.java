package com.smallchat.backend.user.interfaces.web.dto;


import com.smallchat.backend.global.utils.Tokens;

public class LoginDto {
    public record Request(String id, String password) {
    }

    public record Response(Tokens tokens) {
    }
}