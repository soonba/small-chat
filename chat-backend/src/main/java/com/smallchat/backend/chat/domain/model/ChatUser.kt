package com.smallchat.backend.chat.domain.model

import com.smallchat.backend.global.framework.jpa.BaseTime
import jakarta.persistence.*

@Table(name = "chat_users")
@Entity
class ChatUser(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    val id: String? = null,

    @ManyToOne
    @JoinColumn(name = "chat_id")
    val chat: Chat,

    @Column(name = "user_id", nullable = false)
    val userId: String,

    @Column(name = "role", nullable = false)
    val role: String,
) : BaseTime()
