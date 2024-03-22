package com.smallchat.backend.data.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Table(name = "tb_room")
@Entity
public class Room extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "room_id", nullable = false)
    private UUID roomId;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User owner;

    @Column(name = "name", nullable = false)
    private String name;

    public Room(UUID roomId, User owner, String name) {
        this.roomId = roomId;
        this.owner = owner;
        this.name = name;
    }

    protected Room() {
    }
}


