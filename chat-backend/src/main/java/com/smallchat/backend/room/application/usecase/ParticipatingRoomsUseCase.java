package com.smallchat.backend.room.application.usecase;

import com.smallchat.backend.room.framework.web.dto.RoomBasicInfoListDto;

import java.util.UUID;

public interface ParticipatingRoomsUseCase {
    RoomBasicInfoListDto.Response getChattingRoomList(UUID userId);
}
