package com.smallchat.backend.user.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtProvider {
    @Value("${auth.key}")
    private byte[] key;


    public Token createToken(TokenPayload payload) {
        String token = Jwts.builder()
                .claim("userId", payload.userId())
                .claim("nickname", payload.nickname())
                .expiration(payload.tokenType().getExpDate())
                .signWith(Keys.hmacShaKeyFor(key))
                .compact();
        return new Token(token, payload.tokenType());
    }
}
