package com.smallchat.backend.user.application.usecase;


import org.springframework.stereotype.Service;

import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.global.utils.TokenPayload;
import com.smallchat.backend.global.utils.Tokens;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.framework.jpa_adapter.UserOutputAdapter;
import com.smallchat.backend.user.framework.web.dto.FetchMeDto;
import com.smallchat.backend.user.framework.web.dto.RefreshDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenUseCase  {

    private final UserOutputAdapter userOutputAdapter;
    private final JwtProvider jwtProvider;

    public RefreshDto.Response refresh(RefreshDto.Request refreshDto) {
        String rt = refreshDto.refreshToken();
        TokenPayload tokenPayload = jwtProvider.parseToken(rt);

        String id = tokenPayload.userId();
        String nickname = tokenPayload.nickname();
        userOutputAdapter.validateRefreshToken(id, rt);

        Tokens tokens = jwtProvider.createTokens(id, nickname);
        userOutputAdapter.saveRefreshToken(id, tokens.refreshToken());

        return new RefreshDto.Response(tokens);
    }

    public FetchMeDto.Response fetchMe(TokenPayload tokenPayload) {
        User user = userOutputAdapter.loadUser(tokenPayload.userId());
        return new FetchMeDto.Response(user.getUserId(), user.getNickname());
    }
}
