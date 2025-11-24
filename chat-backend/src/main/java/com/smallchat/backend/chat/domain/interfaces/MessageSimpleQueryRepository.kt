package com.smallchat.backend.chat.domain.interfaces

import com.smallchat.backend.chat.domain.model.Message
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

/**
 * Spring에서 제공하는 MongoRepository. 현재는 save와 마지막 메시지 조회에만 사용
 * 단순한 쿼리는 이 인터페이스로 지원
 */
@Repository
interface MessageSimpleQueryRepository : MongoRepository<Message, String> {
    fun findFirstByChatIdOrderBySentAtDesc(chatId: String): Message?
}
