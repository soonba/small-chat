package com.smallchat.backend.room.framework.web.dto;

import java.util.UUID;

public class CreateRoomDto {
    public record Request(String roomName) {
    }

    public record Response(UUID roomId) {
    }
}
