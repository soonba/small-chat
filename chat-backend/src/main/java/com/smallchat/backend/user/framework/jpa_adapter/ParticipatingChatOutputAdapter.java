package com.smallchat.backend.user.framework.jpa_adapter;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.smallchat.backend.user.domain.model.ParticipatingChat;
import com.smallchat.backend.user.domain.model.User;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ParticipatingChatOutputAdapter  {

    private final ParticipatingChatRepository participatingChatRepository;

    public void joinChat(User user, String chatId) {
        participatingChatRepository.save(new ParticipatingChat(user, chatId));
    }

    public void leave(User user, String chatId) {
        participatingChatRepository.findByUserAndChatId(user, chatId)
                .ifPresent((el) -> participatingChatRepository.deleteById(el.getParticipatingChatId()));
    }

    public List<ParticipatingChat> getParticipatingChats(User user) {
        return participatingChatRepository.findByUser(user);
    }
}
