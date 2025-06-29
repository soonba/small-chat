package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.user.framework.web.dto.CreateUserDto;

public interface CreateUserInputPort {
    CreateUserDto.Response createUser(CreateUserDto.Request request);
}
