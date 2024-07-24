package com.smallchat.backend.room.framework.mongodb_adapter;

import com.smallchat.backend.room.application.outputport.ChatOutputPort;
import com.smallchat.backend.room.domain.model.vo.Chat;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class ChatOutputAdapter implements ChatOutputPort {
    private final ChatRepository chatRepository;
    private final MongoTemplate mongoTemplate;

    @Override
    public void save(Chat chat) {
        chatRepository.save(chat);
    }

    @Override
    public List<Chat> getChatList(UUID roomID) {
        String string = roomID.toString();
        MatchOperation condition = Aggregation.match(Criteria.where("roomId").is(string));
        SortOperation sort = Aggregation.sort(Sort.Direction.DESC, "createdAt");
        Aggregation aggregation = Aggregation.newAggregation(condition, sort);
        return mongoTemplate.aggregate(aggregation, "chat", Chat.class).getMappedResults();
    }

    @Override
    public List<Chat> getLastChatInfo(List<UUID> roomIdList) {
        List<String> list = roomIdList.stream().map(UUID::toString).toList();
        MatchOperation condition = Aggregation.match(Criteria.where("roomId").in(list));
        SortOperation sort = Aggregation.sort(Sort.Direction.DESC, "createdAt");
        GroupOperation group = Aggregation.group("roomId")
                .first("message").as("message")
                .first("createdAt").as("createdAt")
                .first("roomId").as("roomId")
                .first("chatType").as("chatType");
        Aggregation aggregation = Aggregation.newAggregation(condition, sort, group);
        AggregationResults<Chat> results = mongoTemplate.aggregate(aggregation, "chat", Chat.class);
        return results.getMappedResults();
    }
}
