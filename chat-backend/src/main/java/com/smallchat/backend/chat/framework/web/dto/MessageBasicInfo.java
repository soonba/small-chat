package com.smallchat.backend.chat.framework.web.dto;

import com.smallchat.backend.chat.domain.model.vo.MessageType;
import com.smallchat.backend.chat.domain.model.vo.Sender;

import java.time.LocalDateTime;

public record MessageBasicInfo(Sender sender, LocalDateTime createdAt, String message, MessageType messageType) {
}
