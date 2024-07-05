package com.smallchat.backend.user.domain.model;

import com.smallchat.backend.domain.BaseTime;
import com.smallchat.backend.user.domain.model.vo.LoginId;
import com.smallchat.backend.user.domain.model.vo.Nickname;
import com.smallchat.backend.user.domain.model.vo.Password;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@Table(name = "tb_v2_user")
@Entity
public class V2User extends BaseTime {
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

    public V2User(Nickname nickname, LoginId loginId, Password password) {
        this.nickname = nickname;
        this.loginId = loginId;
        this.password = password;
    }

    public static V2User createUser(Nickname nickname, LoginId loginId, Password password) {
        return new V2User(nickname, loginId, password);
    }
}
