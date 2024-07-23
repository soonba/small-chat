package com.smallchat.backend.room.application.inputport;

import com.smallchat.backend.room.application.outputport.ChatOutputPort;
import com.smallchat.backend.room.application.usecase.ChatListUseCase;
import com.smallchat.backend.room.domain.model.vo.Chat;
import com.smallchat.backend.room.framework.web.dto.ChatListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatListInputPort implements ChatListUseCase {
    private final ChatOutputPort chatOutputPort;

    @Override
    public ChatListDto.Response getChattingList(UUID roomID) {
        List<Chat> list = chatOutputPort.getChatList(roomID);
        return new ChatListDto.Response(list.stream().map(Chat::toChatBasicInfo).toList());
    }
}
