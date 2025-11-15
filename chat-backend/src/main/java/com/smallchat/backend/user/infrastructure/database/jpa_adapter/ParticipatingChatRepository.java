package com.smallchat.backend.user.infrastructure.database.jpa_adapter;

import com.smallchat.backend.user.domain.model.ParticipatingChat;
import com.smallchat.backend.user.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ParticipatingChatRepository extends JpaRepository<ParticipatingChat, String> {

    List<ParticipatingChat> findByUser(User user);

    Optional<ParticipatingChat> findByUserAndChatId(User user, String chatId);
}
