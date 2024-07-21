package com.smallchat.backend.room.framework.web.dto;


import java.time.LocalDateTime;
import java.util.UUID;

public record RoomBasicInfo(UUID roomId, String roomName, String lastMessage, LocalDateTime lastMessageTime) {
}

