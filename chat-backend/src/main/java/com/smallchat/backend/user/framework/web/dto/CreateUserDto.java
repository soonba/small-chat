package com.smallchat.backend.user.framework.web.dto;

import com.smallchat.backend.user.domain.model.vo.Tokens;

public class CreateUserDto {
    public record Request(String id, String nickname, String password) {
    }

    public record Response(Tokens tokens) {
    }
}
