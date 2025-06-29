package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.user.framework.web.dto.CheckUserDuplicationDto;

public interface ValidateUserInputPort {
    CheckUserDuplicationDto.Response isExistId(String id);
    
    void hasReachedMaxChatLimit(String userId);
}
