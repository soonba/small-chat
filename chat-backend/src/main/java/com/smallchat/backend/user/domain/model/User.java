package com.smallchat.backend.user.domain.model;

import com.smallchat.backend.global.framework.jpa.BaseTime;
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

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "login_id", nullable = false)
    private String loginId;

    @Embedded
    private Password password;

    @Embedded
    private ParticipatingRooms participatingRooms;

    public User(String nickname, String loginId, Password password) {
        this.nickname = nickname;
        this.loginId = loginId;
        this.password = password;
        this.participatingRooms = ParticipatingRooms.init();
    }

    public static User createUser(String nickname, String loginId, Password password) {
        return new User(nickname, loginId, password);
    }


    public User joinParticipatingRoom(UUID participatingRoom) {
        participatingRooms.joinRoom(participatingRoom);
        return this;
    }
}