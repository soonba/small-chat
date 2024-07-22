package com.smallchat.backend.room.application.usecase;

import com.smallchat.backend.room.framework.web.dto.ChatListDto;

import java.util.UUID;

public interface ChatListUseCase {
    ChatListDto.Response getChatList(UUID roomID);
}
