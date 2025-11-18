package com.smallchat.backend.chat.infrastructure.database.jpa_adapter;

import com.smallchat.backend.chat.domain.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepositoryJava extends JpaRepository<Chat, String> {

    List<Chat> findByIdIn(List<String> chatIds);
}
