package com.smallchat.backend.user.application.usecase;

import com.smallchat.backend.user.framework.web.dto.CreateUserDto;

public interface CreateUserUseCase {
    CreateUserDto.Response createUser(CreateUserDto.Request request);
}
