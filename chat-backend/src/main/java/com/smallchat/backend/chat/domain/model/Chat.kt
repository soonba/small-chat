package com.smallchat.backend.chat.domain.model

import com.smallchat.backend.chat.domain.model.vo.Message
import com.smallchat.backend.chat.interfaces.web.dto.ChatMessage
import com.smallchat.backend.global.infrastructure.jpa.BaseTime
import jakarta.persistence.*
import java.time.Instant


@Entity
@Table(name = "chats")
class Chat(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    var id: String? = null,

    @Column(name = "name", nullable = false)
    val name: String
) : BaseTime() {

    val chatIdOrThrow: String
        get() = id ?: throw IllegalStateException("Chat ID is not assigned yet.")

    fun addParticipant(userId: String?): Chat {
//        if (participants.isFull()) {
//            throw new RuntimeException("정원이 다 찼습니다.");
//        }
//        participants.addParticipant(Participant.of(userId));
        return this
    }

    fun removeParticipant(userId: String?): Chat {
//        participants.removeParticipant(Participant.of(userId));
        return this
    }

    val isEmptyChat: Boolean
        get() = true
    //        return participants.isEmpty();
}
