package com.smallchat.backend.user.application.usecase;

import com.smallchat.backend.global.utils.TokenPayload;
import com.smallchat.backend.user.framework.web.dto.FetchMeDto;
import com.smallchat.backend.user.framework.web.dto.RefreshDto;

public interface TokenUseCase {
    RefreshDto.Response refresh(RefreshDto.Request refreshDto);

    FetchMeDto.Response fetchMe(TokenPayload tokenPayload);
}
