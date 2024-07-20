package com.smallchat.backend.room.application.inputport;

import com.smallchat.backend.room.application.outputport.ChatOutputPort;
import com.smallchat.backend.room.application.usecase.ChatListUseCase;
import com.smallchat.backend.room.domain.model.vo.ChatModel;
import com.smallchat.backend.room.framework.web.dto.MessageListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatListInputPort implements ChatListUseCase {
    private final ChatOutputPort chatOutputPort;

    @Override
    public MessageListDto.Response getChatList(UUID roomID) {
        List<ChatModel> list = chatOutputPort.getChatModelList(roomID);
        return new MessageListDto.Response(list.stream().map(ChatModel::toMessage).toList());
    }
}
