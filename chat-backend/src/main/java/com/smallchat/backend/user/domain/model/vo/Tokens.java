package com.smallchat.backend.user.domain.model.vo;

import com.smallchat.backend.user.utils.Token;

public record Tokens(Token accessToken, Token refreshToken) {
}
