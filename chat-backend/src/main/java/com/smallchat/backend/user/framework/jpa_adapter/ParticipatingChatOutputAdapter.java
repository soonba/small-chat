package com.smallchat.backend.user.framework.jpa_adapter;

import com.smallchat.backend.user.application.outputport.ParticipatingChatOutputPort;
import com.smallchat.backend.user.domain.model.ParticipatingChat;
import com.smallchat.backend.user.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class ParticipatingChatOutputAdapter implements ParticipatingChatOutputPort {

    private final ParticipatingChatRepository participatingChatRepository;

    @Override
    public void joinChat(User user, UUID chatId) {
        participatingChatRepository.save(new ParticipatingChat(user, chatId));
    }

    @Override
    public List<ParticipatingChat> getParticipatingChats(User user) {
        return participatingChatRepository.findByUser(user);
    }
}
