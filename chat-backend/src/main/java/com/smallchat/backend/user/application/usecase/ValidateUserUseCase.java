package com.smallchat.backend.user.application.usecase;

import com.smallchat.backend.data.dto.CheckUserDuplicationDto;

public interface ValidateUserUseCase {
    CheckUserDuplicationDto.Response isExistId(String id);

    boolean isExistNickname(String nickname);
}
