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
        chatRepository.save(chat);
    }

    @Override
    public List<Chat> getChatList(UUID roomID) {
        return chatRepository.findByRoomId(roomID);
    }

    @Override
    public List<Chat> getLastChatInfo(List<UUID> roomIdList) {
//        Aggregation.newAggregation(Chat.class, Aggregation.sort(Aggregation.sort(Aggregation..DESC, "timestamp")),
//                Aggregation.group("roomId")
//                        .first(Aggregation.ROOT).as("lastChat"));
        //todo
        return List.of();
    }
}
