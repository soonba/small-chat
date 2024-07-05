package com.smallchat.backend.user.application.inputport;


import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.application.usecase.TokenUseCase;
import com.smallchat.backend.user.domain.model.V2User;
import com.smallchat.backend.user.domain.model.vo.Nickname;
import com.smallchat.backend.user.framework.web.dto.FetchMeDto;
import com.smallchat.backend.user.framework.web.dto.RefreshDto;
import com.smallchat.backend.user.utils.JwtProvider;
import com.smallchat.backend.user.utils.Token;
import com.smallchat.backend.user.utils.TokenPayload;
import com.smallchat.backend.user.utils.Tokens;
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
        userOutputPort.saveRefreshToken(id, tokens.refreshToken().value());

        return new RefreshDto.Response(tokens);
    }

    @Override
    public FetchMeDto.Response fetchMe(String token) {
        TokenPayload tokenPayload = jwtProvider.parseToken(token);
        V2User v2User = userOutputPort.loadUser(tokenPayload.userId());
        return new FetchMeDto.Response(v2User.getUserId(), v2User.getNickname());
    }
}
