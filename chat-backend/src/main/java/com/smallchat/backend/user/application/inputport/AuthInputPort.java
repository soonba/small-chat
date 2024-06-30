package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.data.dto.LoginDto;
import com.smallchat.backend.user.application.usecase.AuthUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthInputPort implements AuthUseCase {
    @Override
    public LoginDto.Response login(LoginDto.Request request) {
        return null;
    }
}
