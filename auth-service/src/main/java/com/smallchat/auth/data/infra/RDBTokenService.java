package com.smallchat.auth.data.infra;

import com.smallchat.auth.data.entity.Token;
import com.smallchat.auth.service.TokenService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class RDBTokenService implements TokenService {

    private final TokenRepository tokenRepository;

    public RDBTokenService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    public void saveRefreshToken(UUID id, String rt) {
        Token token = tokenRepository.findById(id)
                .orElseGet(() -> new Token(id, rt));
        tokenRepository.save(token);
    }

    @Override
    public void validateRefreshToken(UUID id, String rt) {
        tokenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("찾을 수 없는 토큰"))
                .verifying(rt);
    }
}
