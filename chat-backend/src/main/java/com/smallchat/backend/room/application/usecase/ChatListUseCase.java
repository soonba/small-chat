package com.smallchat.backend.room.application.usecase;

import com.smallchat.backend.room.framework.web.dto.MessageListDto;

import java.util.UUID;

public interface ChatListUseCase {
    MessageListDto.Response getChatList(UUID roomID);
}
