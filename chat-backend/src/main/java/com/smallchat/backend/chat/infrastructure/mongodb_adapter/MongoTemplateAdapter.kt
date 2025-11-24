package com.smallchat.backend.chat.infrastructure.mongodb_adapter

import com.smallchat.backend.chat.domain.interfaces.MessageRepositoryPort
import com.smallchat.backend.chat.domain.model.Message
import org.springframework.data.domain.Sort
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria.where
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Repository
import java.time.Instant

@Repository
class MongoTemplateAdapter(
    val mongoTemplate: MongoTemplate,
) : MessageRepositoryPort {
    private val MONGO_INSTANT_MAX: Instant = Instant.ofEpochMilli(Long.MAX_VALUE)
    private val MESSAGE_PAGE_LIMIT: Int = 30

    override fun getMessageList(chatId: String, nextCursor: Long?): List<Message> {
        val cursorInstant = nextCursor?.let { Instant.ofEpochSecond(it) } ?: MONGO_INSTANT_MAX
        val query = Query().apply {
            addCriteria(
                where("chatId").`is`(chatId)
                    .and("sentAt").lt(cursorInstant)
            )
            with(Sort.by(Sort.Direction.DESC, "sentAt"))
            limit(MESSAGE_PAGE_LIMIT)
        }

        return mongoTemplate.find(query, Message::class.java, "message")
            .asReversed()
    }

// list 조회
//    override fun getLastMessageInfo(chatIdList: List<String>): List<MessageKt> {
//        val condition: MatchOperation = Aggregation.match(
//            where("chatId").`in`(chatIdList)
//        )
//        val sort: SortOperation = Aggregation.sort(
//            org.springframework.data.domain.Sort.Direction.DESC,
//            "createdAt"
//        )
//        val group: GroupOperation = Aggregation.group("chatId")
//            .first("message").`as`("message")
//            .first("createdAt").`as`("createdAt")
//            .first("chatId").`as`("chatId")
//            .first("messageType").`as`("messageType")
//        val aggregation =
//            Aggregation.newAggregation(condition, sort, group)
//        val results =
//            mongoTemplate.aggregate(
//                aggregation,
//                "message",
//                Message::class.java
//            )
//        return results.getMappedResults()
//    }
}
