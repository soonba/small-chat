package com.smallchat.backend.data.room;

import java.time.LocalDateTime;
import java.util.UUID;

public record RoomResponse(UUID roomId, String roomName, LocalDateTime lastChatTime, String lastChatMessage) {

}
