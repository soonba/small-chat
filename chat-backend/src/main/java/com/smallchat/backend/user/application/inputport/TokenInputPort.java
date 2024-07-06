package com.smallchat.backend.user.application.inputport;


import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.global.utils.Token;
import com.smallchat.backend.global.utils.TokenPayload;
import com.smallchat.backend.global.utils.Tokens;
import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.application.usecase.TokenUseCase;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.domain.model.vo.Nickname;
import com.smallchat.backend.user.framework.web.dto.FetchMeDto;
import com.smallchat.backend.user.framework.web.dto.RefreshDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TokenInputPort implements TokenUseCase {

    private final UserOutputPort userOutputPort;
    private final JwtProvider jwtProvider;

    @Override
    public Token generateToken(TokenPayload tokenPayload) {
        return null;
    }

    @Override
    public RefreshDto.Response refresh(RefreshDto.Request refreshDto) {
        String rt = refreshDto.refreshToken();
        TokenPayload tokenPayload = jwtProvider.parseToken(rt);

        UUID id = tokenPayload.userId();
        Nickname nickname = tokenPayload.nickname();
        userOutputPort.validateRefreshToken(id, rt);

        Tokens tokens = jwtProvider.createTokens(id, nickname);
        userOutputPort.saveRefreshToken(id, tokens.refreshToken());

        return new RefreshDto.Response(tokens);
    }

    @Override
    public FetchMeDto.Response fetchMe(String token) {
        TokenPayload tokenPayload = jwtProvider.parseToken(token);
        User user = userOutputPort.loadUser(tokenPayload.userId());
        return new FetchMeDto.Response(user.getUserId(), user.getNickname().getValue());
    }
}
