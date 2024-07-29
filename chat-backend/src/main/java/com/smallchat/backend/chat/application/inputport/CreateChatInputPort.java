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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CreateChatInputPort implements CreateChatUseCase {

    private final ChatOutputPort chatOutputPort;
    private final EventOutputPort eventOutputPort;
    private final MessageOutputPort messageOutputPort;

    @Override
    public UUID createChat(TokenPayload tokenPayload, CreateChatDto.Request request) {
        Chat chat = Chat.createChat(tokenPayload.userId(), request.chatName());
        UUID chatId = chatOutputPort.save(chat).getChatId();
        messageOutputPort.save(Message.systemMessage(SystemMessage.CHAT_CREATED, chat.getName(), chatId));
        try {
            eventOutputPort.occurJoinChatEvent(new ChatJoined(tokenPayload.userId(), chatId));
        } catch (Exception e) {
            throw new RuntimeException("이벤트 발행 실패");
        }
        return chatId;
    }
}
