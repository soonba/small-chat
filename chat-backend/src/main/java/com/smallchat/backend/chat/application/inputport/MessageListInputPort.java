package com.smallchat.backend.chat.application.inputport;

import com.smallchat.backend.chat.framework.web.dto.MessageListDto;

public interface MessageListInputPort {
    MessageListDto.Response getMessageList(String chatID, Long nextCursor);
}
