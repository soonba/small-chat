package com.smallchat.backend.chat.application.usecase;

import com.smallchat.backend.chat.application.inputport.LastChatMessageInputPort;
import com.smallchat.backend.chat.application.outputport.ChatOutputPort;
import com.smallchat.backend.chat.domain.model.Chat;
import com.smallchat.backend.chat.domain.model.vo.Message;
import com.smallchat.backend.chat.interfaces.web.dto.ChatBasicInfoListDto;
import com.smallchat.backend.chat.interfaces.web.dto.ChatDetail;
import com.smallchat.backend.user.application.inputport.UserChatListInputPort;
import com.smallchat.backend.user.domain.model.ParticipatingChat;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParticipatingChatsUseCase {

    //todo inputport 수정 필요
    private final UserChatListInputPort userChatListInputPort;
    private final LastChatMessageInputPort lastChatMessageInputPort;
    private final ChatOutputPort chatOutputPort;

    @Transactional
    public ChatBasicInfoListDto.Response getChatList(String userId) {
        List<ParticipatingChat> userJoinedChats = userChatListInputPort.getUserJoinedChats(userId);
        List<String> userJoinedChatIdList = userJoinedChats.stream().map(ParticipatingChat::getChatId).toList();

        List<Chat> chatList = chatOutputPort.findChatBasicByIds(userJoinedChatIdList);
        List<Message> lastMessageList = lastChatMessageInputPort.getLastMessageList(userJoinedChatIdList);

        return new ChatBasicInfoListDto.Response(chatList.stream().map(el -> el.toChatBasicInfo(lastMessageList)).toList());
    }

    public ChatDetail.Response getChatDetail(String chatId) {
        Chat chat = chatOutputPort.load(chatId);
        return new ChatDetail.Response(chatId, chat.getName());
    }
}
