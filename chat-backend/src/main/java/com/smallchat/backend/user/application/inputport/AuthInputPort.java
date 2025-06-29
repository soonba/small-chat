package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.global.utils.TokenPayload;
import com.smallchat.backend.user.framework.web.dto.LoginDto;

public interface AuthInputPort {
    LoginDto.Response login(LoginDto.Request request);

    void logout(TokenPayload request);
}
