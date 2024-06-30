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
    public String presentPassword;
    public String pastPassword;

    public static Password sample() {
        return new Password("12345", "abcde");
    }
}
