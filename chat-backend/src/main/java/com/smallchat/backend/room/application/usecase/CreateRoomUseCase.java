package com.smallchat.backend.room.application.usecase;

import com.smallchat.backend.global.utils.TokenPayload;
import com.smallchat.backend.room.framework.web.dto.CreateRoomDto;

public interface CreateRoomUseCase {

    void createRoom(TokenPayload tokenPayload, CreateRoomDto.Request request);
}
