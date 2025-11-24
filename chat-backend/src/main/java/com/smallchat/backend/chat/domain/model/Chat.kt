package com.smallchat.backend.chat.domain.model

import com.smallchat.backend.global.infrastructure.jpa.BaseTime
import jakarta.persistence.*


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
}
