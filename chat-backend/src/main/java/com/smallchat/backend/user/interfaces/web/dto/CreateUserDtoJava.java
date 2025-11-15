package com.smallchat.backend.user.interfaces.web.dto;

import com.smallchat.backend.global.utils.Tokens;

@Deprecated
public class CreateUserDtoJava {
    public record Request(String id, String nickname, String password) {
    }

    public record Response(Tokens tokens) {
    }
}
