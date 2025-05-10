package com.smallchat.backend.user.application.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.global.utils.Tokens;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.domain.model.vo.Password;
import com.smallchat.backend.user.framework.jpa_adapter.UserOutputAdapter;
import com.smallchat.backend.user.framework.web.dto.CreateUserDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CreateUserUseCase  {

    private final JwtProvider jwtProvider;
    private final UserOutputAdapter userOutputAdapter;

    @Transactional
    public CreateUserDto.Response createUser(CreateUserDto.Request request) {
        String id = request.id();
        Password encrypt = Password.encrypt(request.password());
        String nickname = request.nickname();

        User savedUser = userOutputAdapter.createUser(User.of(nickname, id, encrypt));

        Tokens tokens = jwtProvider.createTokens(savedUser.getUserId(), savedUser.getNickname());
        userOutputAdapter.saveRefreshToken(savedUser.getUserId(), tokens.refreshToken());
        return new CreateUserDto.Response(tokens);
    }
}
