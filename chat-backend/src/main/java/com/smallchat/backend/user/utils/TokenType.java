package com.smallchat.backend.user.utils;

import java.util.Date;

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
}
