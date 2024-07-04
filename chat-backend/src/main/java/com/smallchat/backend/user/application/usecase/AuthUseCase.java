package com.smallchat.backend.user.application.usecase;

import com.smallchat.backend.user.framework.web.dto.LoginDto;

public interface AuthUseCase {
    LoginDto.Response login(LoginDto.Request request);
}
