package com.smallchat.backend.chat.application.inputport;

import com.smallchat.backend.chat.application.outputport.ChatOutputPort;
import com.smallchat.backend.chat.application.usecase.LastChatMessageUseCase;
import com.smallchat.backend.chat.application.usecase.ParticipatingChatsUseCase;
import com.smallchat.backend.chat.domain.model.Chat;
import com.smallchat.backend.chat.domain.model.vo.Message;
import com.smallchat.backend.chat.framework.web.dto.ChatBasicInfoListDto;
import com.smallchat.backend.user.application.usecase.UserChatListUseCase;
import com.smallchat.backend.user.domain.model.ParticipatingChat;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ParticipatingChatsInputPort implements ParticipatingChatsUseCase {

    private final UserChatListUseCase userChatListUseCase;
    private final LastChatMessageUseCase lastChatMessageUseCase;
    private final ChatOutputPort chatOutputPort;

    @Override
    @Transactional
    public ChatBasicInfoListDto.Response getChatList(UUID userId) {
        List<ParticipatingChat> userJoinedChats = userChatListUseCase.getUserJoinedChats(userId);
        List<UUID> userJoinedChatIdList = userJoinedChats.stream().map(ParticipatingChat::getChatId).toList();

        List<Chat> chatList = chatOutputPort.findChatBasicByIds(userJoinedChatIdList);
        List<Message> lastMessageList = lastChatMessageUseCase.getLastMessageList(userJoinedChatIdList);

        return new ChatBasicInfoListDto.Response(chatList.stream().map(el -> el.toChatBasicInfo(lastMessageList)).toList());
    }
}
