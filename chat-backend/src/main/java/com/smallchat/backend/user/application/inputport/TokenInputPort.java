package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.global.utils.AuthenticatedUser;
import com.smallchat.backend.user.interfaces.web.dto.FetchMeDto;

public interface TokenInputPort {
    FetchMeDto.Response fetchMe(AuthenticatedUser authenticatedUser);
}
