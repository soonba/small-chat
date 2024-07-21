package com.smallchat.backend.room.domain.model.vo;

import com.smallchat.backend.room.framework.web.dto.RoomBasicInfo;

import java.time.LocalDateTime;
import java.util.UUID;

public record ChatBasic(String lastMessage, LocalDateTime lastMessageTime) {

    public RoomBasicInfo toRoomBasic(UUID roomId, String roomName) {
        return new RoomBasicInfo(roomId, roomName, lastMessage, lastMessageTime);
    }
}
