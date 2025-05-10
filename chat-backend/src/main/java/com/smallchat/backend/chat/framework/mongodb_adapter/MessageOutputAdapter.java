package com.smallchat.backend.chat.framework.mongodb_adapter;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.LimitOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import com.smallchat.backend.chat.domain.model.vo.Message;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MessageOutputAdapter  {
    public static final int MESSAGE_PAGE_LIMIT = 30;

    private final MessageRepository messageRepository;
    private final MongoTemplate mongoTemplate;

    public void save(Message chat) {
        messageRepository.save(chat);
    }

    public List<Message> getMessageList(String chatID, Long nextCursor) {
        Criteria criteria = Criteria.where("chatId").is(chatID);
        if (nextCursor != null) {
            criteria.and("createdAt").lt(LocalDateTime.ofInstant(Instant.ofEpochSecond(nextCursor - 1),
                    ZoneOffset.UTC));
        }
        MatchOperation condition = Aggregation.match(criteria);
        SortOperation sort = Aggregation.sort(Sort.Direction.DESC, "createdAt");
        LimitOperation limit = Aggregation.limit(MESSAGE_PAGE_LIMIT);
        Aggregation aggregation = Aggregation.newAggregation(condition, sort, limit);
        List<Message> result = mongoTemplate.aggregate(aggregation, "message", Message.class).getMappedResults();
        List<Message> messages = new ArrayList<>(result);
        Collections.reverse(messages);
        return messages;
    }

    public List<Message> getLastMessageInfo(List<String> chatIdList) {
        MatchOperation condition = Aggregation.match(Criteria.where("chatId").in(chatIdList));
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
