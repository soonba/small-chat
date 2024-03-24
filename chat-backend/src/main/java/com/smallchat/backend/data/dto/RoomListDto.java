package com.smallchat.backend.data.dto;

import com.smallchat.backend.data.room.Rooms;

public class RoomListDto {
    public record Response(Rooms rooms) {
    }
}
