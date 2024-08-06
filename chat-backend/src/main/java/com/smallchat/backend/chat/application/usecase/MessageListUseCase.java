package com.smallchat.backend.chat.application.usecase;

import com.smallchat.backend.chat.framework.web.dto.MessageListDto;

public interface MessageListUseCase {
    MessageListDto.Response getMessageList(String chatID, Long nextCursor);
}
