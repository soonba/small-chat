package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.data.dto.CheckUserDuplicationDto;
import com.smallchat.backend.user.application.usecase.ValidateUserUseCase;
import org.springframework.stereotype.Service;

@Service
public class ValidateUserInputPort implements ValidateUserUseCase {
    @Override
    public CheckUserDuplicationDto.Response isExistId(String id) {
        return null;
    }

    @Override
    public boolean isExistNickname(String nickname) {
        return false;
    }
}
