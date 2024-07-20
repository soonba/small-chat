package com.smallchat.backend.room.framework.mongodb_adapter;

import com.smallchat.backend.room.application.outputport.ChatOutputPort;
import com.smallchat.backend.room.domain.model.vo.ChatModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class ChatOutputAdapter implements ChatOutputPort {
    private final ChatRepository chatRepository;

    @Override
    public void save(ChatModel chatModel) {
        //todo
        System.out.println("todo");
    }

    @Override
    public List<ChatModel> getChatModelList(UUID roomID) {
        //todo
        return List.of();
    }
}
