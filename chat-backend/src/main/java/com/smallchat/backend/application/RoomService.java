package com.smallchat.backend.application;

import com.smallchat.backend.data.room.Rooms;
import com.smallchat.backend.domain.User;
import com.smallchat.backend.domain.UserRoom;
import com.smallchat.backend.persistance.UserRepository;
import com.smallchat.backend.persistance.UserRoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RoomService {
    private final UserRoomRepository userRoomRepository;
    private final UserRepository userRepository;

    public RoomService(UserRoomRepository userRoomRepository, UserRepository userRepository) {
        this.userRoomRepository = userRoomRepository;
        this.userRepository = userRepository;
    }


    public Rooms findRoomListByUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("찾을 수 없는 아이디"));
        List<UserRoom> userRoomByUser = userRoomRepository.findUserRoomByUser(user);
//        userRoomByUser.stream().map(userRoom -> new Room())
        //todo wip
        return new Rooms(List.of(null));
    }
}
