package com.smallchat.backend.chat.domain.interfaces

import com.smallchat.backend.chat.domain.model.vo.Message
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository


@Repository
@Deprecated("")
interface MessageRepository : MongoRepository<Message, String>
