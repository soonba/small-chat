package com.smallchat.backend.user.framework.database.jpa_adapter;

import com.smallchat.backend.user.application.outputport.ParticipatingChatOutputPort;
import com.smallchat.backend.user.domain.model.ParticipatingChat;
import com.smallchat.backend.user.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ParticipatingChatOutputAdapter implements ParticipatingChatOutputPort {

    private final ParticipatingChatRepository participatingChatRepository;

    @Override
    public void joinChat(User user, String chatId) {
        participatingChatRepository.save(new ParticipatingChat(user, chatId));
    }

    @Override
    public void leave(User user, String chatId) {
        participatingChatRepository.findByUserAndChatId(user, chatId)
                .ifPresent((el) -> participatingChatRepository.deleteById(el.getParticipatingChatId()));
    }

    @Override
    public List<ParticipatingChat> getParticipatingChats(User user) {
        return participatingChatRepository.findByUser(user);
    }
}
