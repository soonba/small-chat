package com.smallchat.backend.domain;

import com.smallchat.backend.data.room.RoomResponse;
import com.smallchat.backend.room.domain.model.Room;
import com.smallchat.backend.user.domain.model.User;
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
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    protected UserRoom() {
    }

    public UserRoom(Room room, User user) {
        this.room = room;
        this.user = user;
    }

    public UUID getUserRoomId() {
        return userRoomId;
    }

    public Room getRoom() {
        return room;
    }

    public User getUser() {
        return user;
    }

    public RoomResponse toResponse() {
        Room room = this.room;
        return new RoomResponse(room.getRoomId(), room.getName());
    }
}
