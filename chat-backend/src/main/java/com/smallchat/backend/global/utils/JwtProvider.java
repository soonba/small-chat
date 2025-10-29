package com.smallchat.backend.global.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class JwtProvider {
    private final byte[] key;

    public JwtProvider(@Value("${auth.key}") byte[] key) {
        this.key = key;
    }


    public Tokens createTokens(String id, String nickname) {
        String at = createToken(TokenType.ACCESS_TOKEN, new AuthenticatedUser(id, nickname));
        String rt = createToken(TokenType.REFRESH_TOKEN,new AuthenticatedUser(id, nickname));
        return new Tokens(at, rt);
    }

    public String createToken(TokenType tokenType,AuthenticatedUser payload) {
        return Jwts.builder()
                .claim("type", tokenType)
                .claim("userId", payload.getUserId())
                .claim("nickname", payload.getNickname())
                .expiration(tokenType.getExpDate())
                .signWith(Keys.hmacShaKeyFor(key))
                .compact();
    }

    public AuthenticatedUser parseFromBearer(String authorization) {
        String accessToken = authorization.replace("Bearer ", "");
        return parseToken(accessToken);
    }

    public AuthenticatedUser parseToken(String token) {
        Claims payload = Jwts
                .parser()
                .verifyWith(Keys.hmacShaKeyFor(key))
                .build()
                .parseSignedClaims(token)
                .getPayload();
        String userId = Optional.ofNullable(payload.get("userId", String.class)).orElse("");
        String nickname = Optional.ofNullable(payload.get("nickname", String.class)).orElse("");
        return new AuthenticatedUser(userId, nickname);
    }
}
