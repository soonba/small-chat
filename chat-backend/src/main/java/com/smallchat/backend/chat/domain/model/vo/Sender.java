package com.smallchat.backend.chat.domain.model.vo;

import java.util.UUID;

public record Sender(UUID userId, String nickname) {
}
