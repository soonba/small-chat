package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.data.dto.RefreshDto;
import com.smallchat.backend.user.application.usecase.TokenUseCase;
import com.smallchat.backend.user.framework.web.dto.FetchMeDto;
import com.smallchat.backend.user.utils.Token;
import com.smallchat.backend.user.utils.TokenPayload;
import org.springframework.stereotype.Service;

@Service
public class TokenInputPort implements TokenUseCase {

    @Override
    public Token generateToken(TokenPayload tokenPayload) {
        return null;
    }

    @Override
    public RefreshDto.Response refresh(RefreshDto.Request refreshDto) {
        return null;
    }

    @Override
    public FetchMeDto.Response fetchMe(String token) {
        return null;
    }
}
