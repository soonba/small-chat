package com.smallchat.backend.room.framework.mongodb_adapter;

import com.smallchat.backend.room.application.outputport.ChatOutputPort;
import com.smallchat.backend.room.domain.model.vo.Chat;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class ChatOutputAdapter implements ChatOutputPort {
    private final ChatRepository chatRepository;

    @Override
    public void save(Chat chat) {
        //todo
        System.out.println("todo");
    }

    @Override
    public List<Chat> getChatList(UUID roomID) {
        //todo
        return List.of();
    }

    @Override
    public List<Chat> getLastChatInfo(List<UUID> roomIdList) {
        //todo
        return List.of();
    }
}
