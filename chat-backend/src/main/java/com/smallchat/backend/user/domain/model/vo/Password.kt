package com.smallchat.backend.user.domain.model.vo;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;


@Getter
@NoArgsConstructor
@Embeddable
public class Password {
    private String presentPassword;
    private String pastPassword;

    public Password(String presentPassword, String pastPassword) {
        this.presentPassword = presentPassword;
        this.pastPassword = pastPassword;
    }

    public static Password sample() {
        return new Password("12345", "abcde");
    }

    public void verifying(String password) {
        if (!BCrypt.checkpw(password, presentPassword)) {
            throw new RuntimeException("비밀번호 불일치");
        }
    }
}
