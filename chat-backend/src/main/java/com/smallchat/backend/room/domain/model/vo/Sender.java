package com.smallchat.backend.room.domain.model.vo;

import java.util.UUID;

public record Sender(UUID userId, String nickname) {
}
