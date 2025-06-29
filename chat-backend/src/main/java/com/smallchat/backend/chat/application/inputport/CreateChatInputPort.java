package com.smallchat.backend.chat.application.inputport;

import com.smallchat.backend.chat.framework.web.dto.CreateChatDto;
import com.smallchat.backend.global.utils.TokenPayload;

public interface CreateChatInputPort {

    String createChat(TokenPayload tokenPayload, CreateChatDto.Request request);
}
