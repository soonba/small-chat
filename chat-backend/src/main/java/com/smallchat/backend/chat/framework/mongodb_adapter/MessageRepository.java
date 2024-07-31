package com.smallchat.backend.chat.framework.mongodb_adapter;

import com.smallchat.backend.chat.domain.model.vo.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {
}
