package com.smallchat.backend.chat.application

import com.smallchat.backend.chat.domain.interfaces.MessageSimpleQueryRepository
import com.smallchat.backend.chat.domain.model.Message
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class SaveMessageUseCase(private val messageSimpleQueryRepository: MessageSimpleQueryRepository) {
    fun execute(message: Message) {
        val finalMessage = message.copy(
            sentAt = message.sentAt ?: Instant.now()
        )
        messageSimpleQueryRepository.save(finalMessage)
    }
}
