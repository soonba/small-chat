package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.global.utils.AuthenticatedUser;
import com.smallchat.backend.user.interfaces.web.dto.FetchMeDto;
import com.smallchat.backend.user.interfaces.web.dto.RefreshDto;

public interface TokenInputPort {
    RefreshDto.Response refresh(RefreshDto.Request refreshDto);

    FetchMeDto.Response fetchMe(AuthenticatedUser authenticatedUser);
}
