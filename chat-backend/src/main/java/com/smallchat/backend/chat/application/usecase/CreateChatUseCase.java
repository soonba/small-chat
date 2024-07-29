package com.smallchat.backend.chat.application.usecase;

import com.smallchat.backend.chat.framework.web.dto.CreateChatDto;
import com.smallchat.backend.global.utils.TokenPayload;

import java.util.UUID;

public interface CreateChatUseCase {

    UUID createChat(TokenPayload tokenPayload, CreateChatDto.Request request);
}
