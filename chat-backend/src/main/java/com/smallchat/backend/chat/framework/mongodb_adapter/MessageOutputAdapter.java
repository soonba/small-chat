package com.smallchat.backend.chat.framework.mongodb_adapter;

import com.smallchat.backend.chat.application.outputport.MessageOutputPort;
import com.smallchat.backend.chat.domain.model.vo.Message;
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
public class MessageOutputAdapter implements MessageOutputPort {
    private final MessageRepository messageRepository;
    private final MongoTemplate mongoTemplate;

    @Override
    public void save(Message chat) {
        messageRepository.save(chat);
    }

    @Override
    public List<Message> getMessageList(UUID chatID) {
        String string = chatID.toString();
        MatchOperation condition = Aggregation.match(Criteria.where("chatId").is(string));
        SortOperation sort = Aggregation.sort(Sort.Direction.DESC, "createdAt");
        Aggregation aggregation = Aggregation.newAggregation(condition, sort);
        return mongoTemplate.aggregate(aggregation, "message", Message.class).getMappedResults();
    }

    @Override
    public List<Message> getLastMessageInfo(List<UUID> chatIdList) {
        List<String> list = chatIdList.stream().map(UUID::toString).toList();
        MatchOperation condition = Aggregation.match(Criteria.where("chatId").in(list));
        SortOperation sort = Aggregation.sort(Sort.Direction.DESC, "createdAt");
        GroupOperation group = Aggregation.group("chatId")
                .first("message").as("message")
                .first("createdAt").as("createdAt")
                .first("chatId").as("chatId")
                .first("messageType").as("messageType");
        Aggregation aggregation = Aggregation.newAggregation(condition, sort, group);
        AggregationResults<Message> results = mongoTemplate.aggregate(aggregation, "message", Message.class);
        return results.getMappedResults();
    }
}
