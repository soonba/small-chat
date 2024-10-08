package com.smallchat.backend.chat.domain.model;

import com.smallchat.backend.chat.domain.model.vo.Message;
import com.smallchat.backend.chat.domain.model.vo.Participant;
import com.smallchat.backend.chat.framework.web.dto.ChatBasicInfo;
import com.smallchat.backend.global.framework.jpa.BaseTime;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@Table(name = "tb_chat")
@Entity
public class Chat extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "chat_id", nullable = false)
    private String chatId;

    @Column(name = "owner_id", nullable = false)
    private String ownerId;

    @Column(name = "name", nullable = false)
    private String name;

    @Embedded
    private Participants participants;

    public Chat(String ownerId, String name, Participants participants) {
        this.ownerId = ownerId;
        this.name = name;
        this.participants = participants;
    }

    public static Chat of(String ownerId, String name) {
        return new Chat(ownerId, name, Participants.init(ownerId));
    }

    public Chat addParticipant(String userId) {
        if (participants.isFull()) {
            throw new RuntimeException("정원이 다 찼습니다.");
        }
        participants.addParticipant(Participant.of(userId));
        return this;
    }

    public Chat removeParticipant(String userId) {
        participants.removeParticipant(Participant.of(userId));
        return this;
    }

    public ChatBasicInfo toChatBasicInfo(List<Message> chatList) {
        Message chat = chatList.stream().filter(el -> el.getChatId().equals(this.chatId)).findFirst().orElse(Message.notFoundMessage());
        return new ChatBasicInfo(getChatId(), getName(), chat.getMessage(), chat.getCreatedAt());
    }

    public boolean isEmptyChat() {
        return participants.isEmpty();
    }

    public void validateUserId(String userId) {
        participants.validateUserId(userId);
    }
}
