package com.smallchat.backend.global.utils;

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
    private final byte[] key;

    public JwtProvider(@Value("${auth.key}") byte[] key) {
        this.key = key;
    }


    public Tokens createTokens(UUID id, Nickname nickname) {
        String at = createToken(new TokenPayload(TokenType.ACCESS_TOKEN, id, nickname));
        String rt = createToken(new TokenPayload(TokenType.REFRESH_TOKEN, id, nickname));
        return new Tokens(at, rt);
    }

    public String createToken(TokenPayload payload) {
        return Jwts.builder()
                .claim("type", payload.tokenType())
                .claim("userId", payload.userId())
                .claim("nickname", payload.nickname().getValue())
                .expiration(payload.tokenType().getExpDate())
                .signWith(Keys.hmacShaKeyFor(key))
                .compact();
    }

    public TokenPayload parseFromBearer(String authorization) {
        String accessToken = authorization.replace("Bearer ", "");
        return parseToken(accessToken);
    }

    public TokenPayload parseToken(String token) {
        Claims payload = Jwts
                .parser()
                .verifyWith(Keys.hmacShaKeyFor(key))
                .build()
                .parseSignedClaims(token)
                .getPayload();
        String tokenType = Optional.ofNullable(payload.get("type", String.class)).orElseThrow(RuntimeException::new);
        String userId = Optional.ofNullable(payload.get("userId", String.class)).orElse("");
        String nickname = Optional.ofNullable(payload.get("nickname", String.class)).orElse("");
        return new TokenPayload(TokenType.getTokenType(tokenType), UUID.fromString(userId), new Nickname(nickname));
    }
}
