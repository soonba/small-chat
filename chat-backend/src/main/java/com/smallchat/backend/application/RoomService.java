package com.smallchat.backend.application;

import com.smallchat.backend.data.dto.CreateRoomDto;
import com.smallchat.backend.data.room.Rooms;
import com.smallchat.backend.domain.Room;
import com.smallchat.backend.domain.UserRoom;
import com.smallchat.backend.persistance.RoomRepository;
import com.smallchat.backend.persistance.UserRoomRepository;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.framework.jpa_adapter.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RoomService {
    private final UserRoomRepository userRoomRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    public RoomService(UserRoomRepository userRoomRepository, UserRepository userRepository, RoomRepository roomRepository) {
        this.userRoomRepository = userRoomRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
    }

    public Rooms findRoomListByUser(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("찾을 수 없는 아이디"));
        List<UserRoom> userRoomByUser = userRoomRepository.findUserRoomByUser(user);
        return new Rooms(userRoomByUser.stream().map(UserRoom::toResponse).toList());
    }

    @Transactional
    public void createRoom(UUID userId, CreateRoomDto.Request request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("찾을 수 없는 유저"));
        Room room = Room.fromUserId(user, request.roomName());

        Room savedRoom = roomRepository.save(room);
        UserRoom userRoom = new UserRoom(savedRoom, user);

        userRoomRepository.save(userRoom);
    }

    public void joinRoom(UUID userId, String roomIdStr) {
        UUID roomId = UUID.fromString(roomIdStr);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("찾을 수 없는 유저"));
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RuntimeException("찾을 수 없는 채팅방"));
        if (userRoomRepository.existsByUserAndRoom(user, room)) {
            throw new RuntimeException("이미 참여중인 채팅방입니다.");
        }
        userRoomRepository.save(new UserRoom(room, user));
    }
}
