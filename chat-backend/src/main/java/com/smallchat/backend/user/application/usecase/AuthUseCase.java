package com.smallchat.backend.user.application.usecase;

import com.smallchat.backend.data.dto.LoginDto;

public interface AuthUseCase {
    LoginDto.Response login(LoginDto.Request request);
}
