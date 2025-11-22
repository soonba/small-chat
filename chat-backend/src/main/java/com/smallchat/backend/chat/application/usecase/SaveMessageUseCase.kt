package com.smallchat.backend.chat.application.usecase

import com.smallchat.backend.chat.domain.interfaces.MessageSimpleQueryRepository
import com.smallchat.backend.chat.domain.model.MessageKt
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class SaveMessageUseCase(private val messageSimpleQueryRepository: MessageSimpleQueryRepository) {
    fun execute(messageKt: MessageKt) {
        val finalMessage = messageKt.copy(
            sentAt = messageKt.sentAt ?: Instant.now()
        )
        messageSimpleQueryRepository.save(finalMessage)
    }
}
