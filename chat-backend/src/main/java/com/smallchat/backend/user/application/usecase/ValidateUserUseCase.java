package com.smallchat.backend.user.application.usecase;

import com.smallchat.backend.user.framework.web.dto.CheckUserDuplicationDto;

public interface ValidateUserUseCase {
    CheckUserDuplicationDto.Response isExistId(String id);

    //todo
    boolean isExistNickname(String nickname);

    void hasReachedMaxChatLimit(String userId);
}
