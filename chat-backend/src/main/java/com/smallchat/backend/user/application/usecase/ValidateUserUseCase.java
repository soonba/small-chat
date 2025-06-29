package com.smallchat.backend.user.application.usecase;

import com.smallchat.backend.user.application.inputport.ValidateUserInputPort;
import com.smallchat.backend.user.application.outputport.ParticipatingChatOutputPort;
import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.domain.model.ParticipatingChat;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.framework.web.dto.CheckUserDuplicationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ValidateUserUseCase implements ValidateUserInputPort {

    private final UserOutputPort userOutputPort;
    private final ParticipatingChatOutputPort participatingChatOutputPort;

    @Override
    public CheckUserDuplicationDto.Response isExistId(String id) {
        return new CheckUserDuplicationDto.Response(userOutputPort.isExistID(id));
    }
    
    @Override
    public void hasReachedMaxChatLimit(String userId) {
        User user = userOutputPort.loadUser(userId);
        List<ParticipatingChat> participatingChats = participatingChatOutputPort.getParticipatingChats(user);
        if (participatingChats.size() > 5) {
            throw new RuntimeException("최대 5개 채팅에 참여할 수 있습니다.");
        }
    }
}
