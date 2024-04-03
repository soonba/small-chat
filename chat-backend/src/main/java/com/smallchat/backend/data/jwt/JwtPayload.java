package com.smallchat.backend.data.jwt;

import java.util.UUID;

public record JwtPayload(UUID userId, UUID authId, String nickname) {
}
