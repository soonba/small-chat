package com.smallchat.backend.chat.framework.jpa_adapter;

import com.smallchat.backend.chat.domain.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChatRepository extends JpaRepository<Chat, UUID> {

    List<Chat> findByChatIdIn(List<UUID> chatIds);
}
