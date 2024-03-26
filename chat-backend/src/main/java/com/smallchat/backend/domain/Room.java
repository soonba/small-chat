package com.smallchat.backend.domain;

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

    public Room(User owner, String name) {
        this.owner = owner;
        this.name = name;
    }

    protected Room() {
    }

    public UUID getRoomId() {
        return roomId;
    }

    public User getOwner() {
        return owner;
    }

    public String getName() {
        return name;
    }

    public static Room fromUserId(User user, String name) {
        return new Room(user, name);
    }
}


