package com.smallchat.backend.chat.application.usecase;

import com.smallchat.backend.chat.framework.web.dto.ChatBasicInfoListDto;

import java.util.UUID;

public interface ParticipatingChatsUseCase {
    ChatBasicInfoListDto.Response getChatList(UUID userId);
}
