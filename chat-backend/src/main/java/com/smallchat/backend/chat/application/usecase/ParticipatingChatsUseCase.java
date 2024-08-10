package com.smallchat.backend.chat.application.usecase;

import com.smallchat.backend.chat.framework.web.dto.ChatBasicInfoListDto;
import com.smallchat.backend.chat.framework.web.dto.ChatDetail;

public interface ParticipatingChatsUseCase {
    ChatBasicInfoListDto.Response getChatList(String userId);

    ChatDetail.Response getChatDetail(String chatId);
}
