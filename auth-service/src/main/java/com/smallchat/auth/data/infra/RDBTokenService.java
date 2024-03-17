package com.smallchat.auth.data.infra;

import com.smallchat.auth.service.TokenService;
import org.springframework.stereotype.Service;

@Service
public class RDBTokenService implements TokenService {

    private final TokenRepository tokenRepository;

    public RDBTokenService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    public void saveRefreshToken(String rt) {
        //todo
    }

    @Override
    public boolean existsRefreshToken(String rt) {
        return false;
    }
}
