package com.smallchat.backend.chat.interfaces.web.dto;

import com.smallchat.backend.chat.domain.model.vo.MessageType;
import com.smallchat.backend.chat.domain.model.vo.Sender;

import java.time.ZonedDateTime;

public record MessageBasicInfo(Sender sender, ZonedDateTime createdAt, String message, MessageType messageType) {
}
