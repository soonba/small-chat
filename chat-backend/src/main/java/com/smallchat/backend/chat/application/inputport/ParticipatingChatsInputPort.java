package com.smallchat.backend.chat.application.inputport;

import com.smallchat.backend.chat.framework.web.dto.ChatBasicInfoListDto;
import com.smallchat.backend.chat.framework.web.dto.ChatDetail;

public interface ParticipatingChatsInputPort {
    ChatBasicInfoListDto.Response getChatList(String userId);

    ChatDetail.Response getChatDetail(String chatId);
}
