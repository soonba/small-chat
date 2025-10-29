package com.smallchat.backend.chat.application.inputport;

import com.smallchat.backend.chat.interfaces.web.dto.CreateChatDto;
import com.smallchat.backend.global.utils.AuthenticatedUser;

public interface CreateChatInputPort {

    String createChat(AuthenticatedUser tokenPayload, CreateChatDto.Request request);
}
