package com.smallchat.auth.data.jwt;

import com.smallchat.auth.data.entity.Auth;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtProcessor {

  @Value("${auth.key}")
  private byte[] key;

  public Token generateByAuth(Auth auth) {
    Date atExp = TokenType.ACCESS_TOKEN.getExpDate();
    Date rtExp = TokenType.REFRESH_TOKEN.getExpDate();
    return new Token(
        Jwts.builder()
            .claim("id",auth.getId().toString())
            .claim("userId",auth.getUserId())
            .claim("nickname",auth.getNickname())
            .expiration(atExp)
            .signWith(Keys.hmacShaKeyFor(key))
            .compact(),
        Jwts.builder().expiration(rtExp).signWith(Keys.hmacShaKeyFor(key)).compact());
  }
}
