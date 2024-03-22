package com.smallchat.backend.data.jwt;

import java.util.UUID;

public record JwtPayload(UUID id, String nickname, String userId) {
}
