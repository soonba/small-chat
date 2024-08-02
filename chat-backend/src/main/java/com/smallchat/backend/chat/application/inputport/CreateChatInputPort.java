package com.smallchat.backend.chat.application.inputport;

import com.smallchat.backend.chat.application.outputport.ChatOutputPort;
import com.smallchat.backend.chat.application.outputport.EventOutputPort;
import com.smallchat.backend.chat.application.outputport.MessageOutputPort;
import com.smallchat.backend.chat.application.usecase.CreateChatUseCase;
import com.smallchat.backend.chat.domain.event.ChatJoined;
import com.smallchat.backend.chat.domain.model.Chat;
import com.smallchat.backend.chat.domain.model.vo.Message;
import com.smallchat.backend.chat.domain.model.vo.SystemMessage;
import com.smallchat.backend.chat.framework.web.dto.CreateChatDto;
import com.smallchat.backend.global.utils.TokenPayload;
import com.smallchat.backend.user.application.usecase.ValidateUserUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateChatInputPort implements CreateChatUseCase {

    private final ChatOutputPort chatOutputPort;
    private final EventOutputPort eventOutputPort;
    private final MessageOutputPort messageOutputPort;

    private final ValidateUserUseCase validateUserUseCase;

    @Override
    public String createChat(TokenPayload tokenPayload, CreateChatDto.Request request) {
        String ownerId = tokenPayload.userId();
        validateUserUseCase.hasReachedMaxChatLimit(ownerId);
        Chat chat = Chat.of(ownerId, request.chatName());
        String chatId = chatOutputPort.save(chat).getChatId();
        messageOutputPort.save(Message.systemMessage(SystemMessage.CHAT_CREATED, chat.getName(), chatId));
        eventOutputPort.occurJoinChatEvent(new ChatJoined(ownerId, chatId));
        return chatId;
    }
}
