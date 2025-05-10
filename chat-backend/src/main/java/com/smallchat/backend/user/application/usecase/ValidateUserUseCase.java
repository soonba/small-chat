package com.smallchat.backend.user.application.usecase;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smallchat.backend.user.domain.model.ParticipatingChat;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.framework.jpa_adapter.ParticipatingChatOutputAdapter;
import com.smallchat.backend.user.framework.jpa_adapter.UserOutputAdapter;
import com.smallchat.backend.user.framework.web.dto.CheckUserDuplicationDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ValidateUserUseCase  {

    private final UserOutputAdapter userOutputAdapter;
    private final ParticipatingChatOutputAdapter participatingChatOutputAdapter;

    public CheckUserDuplicationDto.Response isExistId(String id) {
        return new CheckUserDuplicationDto.Response(userOutputAdapter.isExistID(id));
    }
    
    public void hasReachedMaxChatLimit(String userId) {
        User user = userOutputAdapter.loadUser(userId);
        List<ParticipatingChat> participatingChats = participatingChatOutputAdapter.getParticipatingChats(user);
        if (participatingChats.size() > 5) {
            throw new RuntimeException("최대 5개 채팅에 참여할 수 있습니다.");
        }
    }
}
