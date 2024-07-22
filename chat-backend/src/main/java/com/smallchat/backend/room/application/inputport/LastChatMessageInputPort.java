package com.smallchat.backend.room.application.inputport;

import com.smallchat.backend.room.application.outputport.ChatOutputPort;
import com.smallchat.backend.room.application.usecase.LastChatMessageUseCase;
import com.smallchat.backend.room.domain.model.vo.Chat;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LastChatMessageInputPort implements LastChatMessageUseCase {
    private final ChatOutputPort chatOutputPort;

    @Override
    public List<Chat> getLastMessageListByRoomIdList(List<UUID> roomIdList) {
        return chatOutputPort.getLastChatInfo(roomIdList);
    }
}
