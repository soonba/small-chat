package com.smallchat.backend.global.utils;

import java.util.UUID;

public record TokenPayload(TokenType tokenType, UUID userId, String nickname) {
}
