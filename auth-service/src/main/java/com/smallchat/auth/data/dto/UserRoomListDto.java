package com.smallchat.auth.data.dto;

import java.util.UUID;

public class UserRoomListDto {
    public record Response(UUID roomId, String roomName) {
    }
}
