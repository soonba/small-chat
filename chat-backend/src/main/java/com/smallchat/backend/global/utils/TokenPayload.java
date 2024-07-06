package com.smallchat.backend.global.utils;

import com.smallchat.backend.user.domain.model.vo.Nickname;

import java.util.UUID;

public record TokenPayload(TokenType tokenType, UUID userId, Nickname nickname) {
}