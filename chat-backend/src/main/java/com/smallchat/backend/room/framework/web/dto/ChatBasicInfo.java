package com.smallchat.backend.room.framework.web.dto;

import com.smallchat.backend.room.domain.model.vo.ChatType;
import com.smallchat.backend.room.domain.model.vo.Sender;

import java.time.LocalDateTime;

public record ChatBasicInfo(Sender sender, LocalDateTime createdAt, String message, ChatType chatType) {
}
