package com.smallchat.backend.room.application.inputport;

import com.smallchat.backend.room.application.outputport.ChatOutputPort;
import com.smallchat.backend.room.application.usecase.LastChatMessageUseCase;
import com.smallchat.backend.room.domain.model.Room;
import com.smallchat.backend.room.domain.model.vo.ChatBasic;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LastChatMessageInputPort implements LastChatMessageUseCase {
    private final ChatOutputPort chatOutputPort;

    @Override
    public List<ChatBasic> addChatBasicInfo(List<Room> roomList) {
        return chatOutputPort.getLastChatInfo(roomList);
    }
}
