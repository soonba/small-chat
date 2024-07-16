package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.application.usecase.ValidateUserUseCase;
import com.smallchat.backend.user.framework.web.dto.CheckUserDuplicationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ValidateUserInputPort implements ValidateUserUseCase {

    private final UserOutputPort userOutputPort;

    @Override
    public CheckUserDuplicationDto.Response isExistId(String id) {
        return new CheckUserDuplicationDto.Response(userOutputPort.isExistID(id));
    }

    //todo
    @Override
    public boolean isExistNickname(String nickname) {
        return false;
    }
}
