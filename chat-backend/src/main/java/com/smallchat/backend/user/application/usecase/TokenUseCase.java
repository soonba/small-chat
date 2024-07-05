package com.smallchat.backend.user.application.usecase;

import com.smallchat.backend.user.framework.web.dto.FetchMeDto;
import com.smallchat.backend.user.framework.web.dto.RefreshDto;
import com.smallchat.backend.user.utils.Token;
import com.smallchat.backend.user.utils.TokenPayload;

public interface TokenUseCase {
    Token generateToken(TokenPayload tokenPayload);

    RefreshDto.Response refresh(RefreshDto.Request refreshDto);

    FetchMeDto.Response fetchMe(String token);
}
