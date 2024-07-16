package com.smallchat.backend.user.domain.model.vo;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Password {
    private String presentPassword;
    private String pastPassword;

    public static Password sample() {
        return new Password("12345", "abcde");
    }

    public static Password encrypt(String rawString) {
        // todo encrypt
        String encrypt = rawString;
        return new Password(encrypt, encrypt);
    }

    public void verifying(String password) {
        // todo verify password
        if (!this.presentPassword.equals(password)) {
            throw new RuntimeException("비밀번호 불일치");
        }
    }
}
