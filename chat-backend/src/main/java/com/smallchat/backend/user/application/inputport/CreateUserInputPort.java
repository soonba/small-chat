package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.global.utils.Tokens;
import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.application.usecase.CreateUserUseCase;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.domain.model.vo.LoginId;
import com.smallchat.backend.user.domain.model.vo.Nickname;
import com.smallchat.backend.user.domain.model.vo.Password;
import com.smallchat.backend.user.framework.web.dto.CreateUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CreateUserInputPort implements CreateUserUseCase {

    private final JwtProvider jwtProvider;
    private final UserOutputPort userOutputPort;

    @Override
    @Transactional
    public CreateUserDto.Response createUser(CreateUserDto.Request request) {
        LoginId id = new LoginId(request.id());
        Password password = new Password(request.password(), request.password());
        Nickname nickname = new Nickname(request.nickname());

        User savedUser = userOutputPort.createUser(User.createUser(nickname, id, password));

        Tokens tokens = jwtProvider.createTokens(savedUser.getUserId(), savedUser.getNickname());
        userOutputPort.saveRefreshToken(savedUser.getUserId(), tokens.refreshToken());
        return new CreateUserDto.Response(tokens);
    }
}
