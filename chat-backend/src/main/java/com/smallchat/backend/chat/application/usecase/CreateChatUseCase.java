package com.smallchat.backend.chat.application.usecase;

import com.smallchat.backend.chat.framework.web.dto.CreateChatDto;
import com.smallchat.backend.global.utils.TokenPayload;

public interface CreateChatUseCase {

    String createChat(TokenPayload tokenPayload, CreateChatDto.Request request);
}
