package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.user.application.outputport.RefreshTokenOutputPort;
import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.application.usecase.CreateUserUseCase;
import com.smallchat.backend.user.domain.model.V2User;
import com.smallchat.backend.user.domain.model.vo.ID;
import com.smallchat.backend.user.domain.model.vo.Nickname;
import com.smallchat.backend.user.domain.model.vo.Password;
import com.smallchat.backend.user.domain.model.vo.Tokens;
import com.smallchat.backend.user.framework.web.dto.CreateUserDto;
import com.smallchat.backend.user.utils.JwtProvider;
import com.smallchat.backend.user.utils.Token;
import com.smallchat.backend.user.utils.TokenPayload;
import com.smallchat.backend.user.utils.TokenType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CreateUserInputPort implements CreateUserUseCase {

    private final JwtProvider jwtProvider;
    private final UserOutputPort userOutputPort;
    private final RefreshTokenOutputPort refreshTokenOutputPort;

    @Override
    @Transactional
    public CreateUserDto.Response createUser(CreateUserDto.Request request) {
        ID id = new ID(request.id());
        Password password = new Password(request.password(), request.password());
        Nickname nickname = new Nickname(request.nickname());
        if (userOutputPort.isExistID(id)) {
            throw new RuntimeException("이미 존재하는 아이디");
        }
        V2User savedV2User = userOutputPort.saveUser(V2User.createUser(nickname, id, password));
        Token at = jwtProvider.createToken(new TokenPayload(TokenType.ACCESS_TOKEN, savedV2User.getUserId(), savedV2User.getNickname()));
        Token rt = jwtProvider.createToken(new TokenPayload(TokenType.REFRESH_TOKEN, savedV2User.getUserId(), savedV2User.getNickname()));
        refreshTokenOutputPort.saveRefreshToken(savedV2User.getUserId(), rt.token());
        return new CreateUserDto.Response(new Tokens(at, rt));
    }
}
