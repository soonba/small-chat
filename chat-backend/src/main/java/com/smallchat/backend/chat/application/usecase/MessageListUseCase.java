package com.smallchat.backend.chat.application.usecase;

import com.smallchat.backend.chat.framework.web.dto.MessageListDto;

import java.util.UUID;

public interface MessageListUseCase {
    MessageListDto.Response getMessageList(UUID chatID, Long page);
}
