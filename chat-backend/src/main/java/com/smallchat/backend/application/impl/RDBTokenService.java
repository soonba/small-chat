package com.smallchat.backend.application.impl;

import com.smallchat.backend.application.TokenService;
import com.smallchat.backend.data.jwt.JwtPayload;
import com.smallchat.backend.data.jwt.TokenType;
import com.smallchat.backend.data.jwt.Tokens;
import com.smallchat.backend.domain.Auth;
import com.smallchat.backend.domain.Token;
import com.smallchat.backend.persistance.RDBTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class RDBTokenService implements TokenService {

    @Value("${auth.key}")
    private byte[] key;
    private final RDBTokenRepository RDBTokenRepository;

    public RDBTokenService(RDBTokenRepository RDBTokenRepository) {
        this.RDBTokenRepository = RDBTokenRepository;
    }

    @Override
    public void saveRefreshToken(UUID id, String rt) {
        Token token = RDBTokenRepository.findById(id)
                .orElseGet(() -> new Token(id, rt));
        RDBTokenRepository.save(token);
    }

    @Override
    public void validateRefreshToken(UUID id, String rt) {
        RDBTokenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("찾을 수 없는 토큰"))
                .verifying(rt);
    }

    @Override
    public Tokens generateTokensByAuth(Auth auth) {
        Date atExp = TokenType.ACCESS_TOKEN.getExpDate();
        Date rtExp = TokenType.REFRESH_TOKEN.getExpDate();
        String accessToken = Jwts.builder()
                .claim("authId", auth.getAuthId().toString())
                .claim("userId", auth.getUser().getUserId())
                .claim("nickname", auth.getUser().getNickname())
                .expiration(atExp)
                .signWith(Keys.hmacShaKeyFor(key))
                .compact();
        String refreshToken = Jwts.builder()
                .claim("authId", auth.getAuthId().toString())
                .expiration(rtExp).signWith(Keys.hmacShaKeyFor(key)).compact();
        RDBTokenRepository.save(new Token(auth.getAuthId(), refreshToken));
        return new Tokens(accessToken, refreshToken);
    }

    @Override
    public JwtPayload compile(String token) {
        Claims payload = Jwts
                .parser()
                .verifyWith(Keys.hmacShaKeyFor(key))
                .build()
                .parseSignedClaims(token)
                .getPayload();
        String authId = Optional.ofNullable(payload.get("authId", String.class)).orElseThrow(() -> new RuntimeException("유효하지 않은 토큰입니다."));
        String userId = Optional.ofNullable(payload.get("userId", String.class)).orElse("");
        String nickname = Optional.ofNullable(payload.get("nickname", String.class)).orElse("");
        return new JwtPayload(UUID.fromString(userId), UUID.fromString(authId), nickname);
    }

}
