package com.smallchat.backend.user.utils;

import com.smallchat.backend.user.domain.model.vo.Nickname;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
public class JwtProvider {
    @Value("${auth.key}")
    private byte[] key;


    public Token createToken(TokenPayload payload) {
        String token = Jwts.builder()
                .claim("type", payload.tokenType())
                .claim("userId", payload.userId())
                .claim("nickname", payload.nickname())
                .expiration(payload.tokenType().getExpDate())
                .signWith(Keys.hmacShaKeyFor(key))
                .compact();
        return new Token(token, payload.tokenType());
    }

    public TokenPayload compile(Token token) {
        Claims payload = Jwts
                .parser()
                .verifyWith(Keys.hmacShaKeyFor(key))
                .build()
                .parseSignedClaims(token.value())
                .getPayload();
        TokenType tokenType = Optional.ofNullable(payload.get("type", TokenType.class)).orElseThrow(RuntimeException::new);
        UUID userId = Optional.ofNullable(payload.get("userId", UUID.class)).orElseThrow(RuntimeException::new);
        Nickname nickname = Optional.ofNullable(payload.get("nickname", Nickname.class)).orElseGet(() -> new Nickname(""));
        return new TokenPayload(tokenType, userId, nickname);
    }
}
