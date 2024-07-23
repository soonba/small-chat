package com.smallchat.backend.room.framework.mongodb_adapter;

import com.smallchat.backend.room.application.outputport.ChatOutputPort;
import com.smallchat.backend.room.domain.model.vo.Chat;
import lombok.RequiredArgsConstructor;
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
        System.out.println("????");
        System.out.println(roomIdList.get(0));
//        MatchOperation matchStage = Aggregation.match(Criteria.where("roomId").is("139ee7ba-40b7-40ed-a5d8-3a36a44bdb57"));
        MatchOperation matchStage = Aggregation.match(Criteria.where("roomId").in(roomIdList));
        Aggregation aggregation = Aggregation.newAggregation(matchStage);
        AggregationResults<Chat> results = mongoTemplate.aggregate(aggregation, "chat", Chat.class);
        List<Chat> mappedResults = results.getMappedResults();
        System.out.println("======");
        System.out.println(mappedResults);
        System.out.println("======");
        return mappedResults;
    }
}
