package com.smallchat.backend.global.utils;

import java.util.Date;
import java.util.NoSuchElementException;

public enum TokenType {
    ACCESS_TOKEN(1000 * 60 * 60 * 24),
    REFRESH_TOKEN(1000 * 60 * 60 * 24 * 10);

    TokenType(int expiredTimeInMills) {
        this.expiredTimeInMills = expiredTimeInMills;
    }

    private final int expiredTimeInMills;

    public Date getExpDate() {
        return new Date(System.currentTimeMillis() + this.expiredTimeInMills);
    }

    public static TokenType getTokenType(String tokenTypeString) {
        for (TokenType tokenType : TokenType.values()) {
            if (tokenType.name().equalsIgnoreCase(tokenTypeString)) {
                return tokenType;
            }
        }
        throw new NoSuchElementException("No enum constant " + TokenType.class.getCanonicalName() + "." + tokenTypeString);
    }
}
