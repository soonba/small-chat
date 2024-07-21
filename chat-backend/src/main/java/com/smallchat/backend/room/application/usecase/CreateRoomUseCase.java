package com.smallchat.backend.room.application.usecase;

import com.smallchat.backend.global.utils.TokenPayload;
import com.smallchat.backend.room.framework.web.dto.CreateRoomDto;

import java.util.UUID;

public interface CreateRoomUseCase {

    UUID createRoom(TokenPayload tokenPayload, CreateRoomDto.Request request);
}
