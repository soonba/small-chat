package com.smallchat.backend.domain;

import jakarta.persistence.*;

import java.util.UUID;

@Entity(name = "tb_user_room")
public class UserRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_room_id", nullable = false)
    private UUID userRoomId;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    protected UserRoom() {
    }

    public UserRoom(Room room, User user) {
        this.room = room;
        this.user = user;
    }
}
