package com.smallchat.backend.user.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ParticipatingChat {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "participating_chat_id", nullable = false)
    private UUID participatingChatId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "chat_id", nullable = false)
    private UUID chatId;

    public ParticipatingChat(User user, UUID chatId) {
        this.user = user;
        this.chatId = chatId;
    }
}

