package com.smallchat.backend.room.framework.web.dto;

import com.smallchat.backend.room.domain.model.vo.Sender;

import java.time.LocalDateTime;

public record Message(Sender sender, LocalDateTime createdAt, String message) {
}
