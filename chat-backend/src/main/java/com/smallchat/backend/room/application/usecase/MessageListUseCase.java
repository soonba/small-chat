package com.smallchat.backend.room.application.usecase;

import com.smallchat.backend.room.framework.web.dto.MessageListDto;

import java.util.UUID;

public interface MessageListUseCase {
    MessageListDto.Response getMessageList(UUID roomID);
}
