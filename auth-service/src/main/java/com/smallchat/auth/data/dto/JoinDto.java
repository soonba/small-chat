package com.smallchat.auth.data.dto;

import com.smallchat.auth.data.jwt.Token;

public class JoinDto {
  public record Request(String userId, String nickname, String password) {}

  public record Response(Token token) {}
}
