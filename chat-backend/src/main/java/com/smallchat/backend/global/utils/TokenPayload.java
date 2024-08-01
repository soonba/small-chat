package com.smallchat.backend.global.utils;

public record TokenPayload(TokenType tokenType, String userId, String nickname) {
}
