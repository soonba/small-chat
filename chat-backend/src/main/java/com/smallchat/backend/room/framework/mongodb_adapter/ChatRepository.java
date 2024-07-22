package com.smallchat.backend.room.framework.mongodb_adapter;

import com.smallchat.backend.room.domain.model.vo.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends MongoRepository<Chat, String> {
}
