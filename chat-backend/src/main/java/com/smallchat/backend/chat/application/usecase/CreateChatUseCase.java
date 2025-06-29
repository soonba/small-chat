package com.smallchat.backend.chat.application.usecase;

import org.springframework.stereotype.Service;

import com.smallchat.backend.chat.application.inputport.CreateChatInputPort;
import com.smallchat.backend.chat.application.outputport.ChatOutputPort;
import com.smallchat.backend.chat.application.outputport.EventOutputPort;
import com.smallchat.backend.chat.application.outputport.MessageOutputPort;
import com.smallchat.backend.chat.domain.event.ChatJoined;
import com.smallchat.backend.chat.domain.model.Chat;
import com.smallchat.backend.chat.domain.model.vo.Message;
import com.smallchat.backend.chat.domain.model.vo.SystemMessage;
import com.smallchat.backend.chat.framework.web.dto.CreateChatDto;
import com.smallchat.backend.global.utils.TokenPayload;
import com.smallchat.backend.user.application.inputport.ValidateUserInputPort;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CreateChatUseCase implements CreateChatInputPort {

    private final ChatOutputPort chatOutputPort;
    private final EventOutputPort eventOutputPort;
    private final MessageOutputPort messageOutputPort;

    //todo inputport 수정 필요
    private final ValidateUserInputPort validateUserInputPort;

    @Override
    public String createChat(TokenPayload tokenPayload, CreateChatDto.Request request) {
        String ownerId = tokenPayload.userId();
        validateUserInputPort.hasReachedMaxChatLimit(ownerId);
        Chat chat = Chat.of(ownerId, request.chatName());
        String chatId = chatOutputPort.save(chat).getChatId();
        messageOutputPort.save(Message.systemMessage(SystemMessage.CHAT_CREATED, chat.getName(), chatId));
        eventOutputPort.occurJoinChatEvent(new ChatJoined(ownerId, chatId));
        return chatId;
    }
}
