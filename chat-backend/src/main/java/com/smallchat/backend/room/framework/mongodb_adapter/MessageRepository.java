package com.smallchat.backend.room.framework.mongodb_adapter;

import com.smallchat.backend.room.domain.model.vo.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {

    List<Message> findByRoomId(UUID roomId);
}
