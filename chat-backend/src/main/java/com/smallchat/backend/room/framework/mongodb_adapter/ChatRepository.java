package com.smallchat.backend.room.framework.mongodb_adapter;

import com.smallchat.backend.room.domain.model.vo.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChatRepository extends MongoRepository<Chat, String> {

    List<Chat> findByRoomId(UUID roomId);
}
