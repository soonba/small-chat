package com.smallchat.backend.user.domain.model;

import com.smallchat.backend.global.framework.jpa.BaseTime;
import com.smallchat.backend.user.domain.model.vo.LoginId;
import com.smallchat.backend.user.domain.model.vo.Nickname;
import com.smallchat.backend.user.domain.model.vo.Password;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@Table(name = "tb_user")
@Entity
public class User extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Embedded
    private Nickname nickname;

    @Embedded
    private LoginId loginId;

    @Embedded
    private Password password;

    public User(Nickname nickname, LoginId loginId, Password password) {
        this.nickname = nickname;
        this.loginId = loginId;
        this.password = password;
    }

    public static User createUser(Nickname nickname, LoginId loginId, Password password) {
        return new User(nickname, loginId, password);
    }
}
