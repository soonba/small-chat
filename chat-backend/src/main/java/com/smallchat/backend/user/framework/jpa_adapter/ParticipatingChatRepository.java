package com.smallchat.backend.user.framework.jpa_adapter;

import com.smallchat.backend.user.domain.model.ParticipatingChat;
import com.smallchat.backend.user.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipatingChatRepository extends JpaRepository<ParticipatingChat, String> {

    List<ParticipatingChat> findByUser(User user);
}
