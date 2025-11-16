package com.smallchat.backend.user.domain.model;

import com.smallchat.backend.global.framework.jpa.BaseTime;
import com.smallchat.backend.user.domain.model.vo.Password;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Table(name = "tb_user")
@Entity
public class User extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "login_id", nullable = false)
    private String loginId;

    @Embedded
    private Password password;

    public User(String nickname, String loginId, Password password) {
        this.nickname = nickname;
        this.loginId = loginId;
        this.password = password;
    }

    public static User of(String nickname, String loginId, Password password) {
        return new User(nickname, loginId, password);
    }

    public String getUserId() {
        return userId;
    }

    public String getNickname() {
        return nickname;
    }

    public String getLoginId() {
        return loginId;
    }

    public Password getPassword() {
        return password;
    }
}
