package com.smallchat.backend.user.application.inputport;


import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.application.usecase.TokenUseCase;
import com.smallchat.backend.user.domain.model.vo.Nickname;
import com.smallchat.backend.user.domain.model.vo.Tokens;
import com.smallchat.backend.user.framework.web.dto.FetchMeDto;
import com.smallchat.backend.user.framework.web.dto.RefreshDto;
import com.smallchat.backend.user.utils.JwtProvider;
import com.smallchat.backend.user.utils.Token;
import com.smallchat.backend.user.utils.TokenPayload;
import com.smallchat.backend.user.utils.TokenType;
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
        TokenPayload tokenPayload = jwtProvider.compile(new Token(rt, TokenType.REFRESH_TOKEN));

        UUID id = tokenPayload.userId();
        Nickname nickname = tokenPayload.nickname();
        userOutputPort.validateRefreshToken(id, rt);

        Token newAt = jwtProvider.createToken(new TokenPayload(TokenType.ACCESS_TOKEN, id, nickname));
        Token newRt = jwtProvider.createToken(new TokenPayload(TokenType.ACCESS_TOKEN, id, nickname));
        userOutputPort.saveRefreshToken(id, newRt.value());

        return new RefreshDto.Response(new Tokens(newAt, newRt));
    }

    @Override
    public FetchMeDto.Response fetchMe(String token) {
        return null;
    }
}
