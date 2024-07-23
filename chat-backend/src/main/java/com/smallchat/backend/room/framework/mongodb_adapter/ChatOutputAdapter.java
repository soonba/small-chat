package com.smallchat.backend.room.framework.mongodb_adapter;

import com.smallchat.backend.room.application.outputport.ChatOutputPort;
import com.smallchat.backend.room.domain.model.vo.Chat;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
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
        return chatRepository.findByRoomId(roomID);
    }

    @Override
    public List<Chat> getLastChatInfo(List<UUID> roomIdList) {
        MatchOperation matchStage = Aggregation.match(Criteria.where("roomId").in(roomIdList));
        Aggregation aggregation = Aggregation.newAggregation(matchStage,
                Aggregation.sort(Sort.Direction.DESC, "createAt"),
                Aggregation.group("roomId").first(Aggregation.ROOT).as("lastChat"));
        AggregationResults<Chat> aggregate = mongoTemplate.aggregate(aggregation, Chat.class, Chat.class);
        return aggregate.getMappedResults();
    }
}
