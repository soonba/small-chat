package com.smallchat.backend.chat.application.usecase;

import com.smallchat.backend.chat.framework.web.dto.ChatBasicInfoListDto;

public interface ParticipatingChatsUseCase {
    ChatBasicInfoListDto.Response getChatList(String userId);
}
