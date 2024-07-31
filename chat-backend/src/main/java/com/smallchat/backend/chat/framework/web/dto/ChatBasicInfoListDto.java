package com.smallchat.backend.chat.framework.web.dto;

import java.util.List;

public class ChatBasicInfoListDto {

    public record Response(List<ChatBasicInfo> chatBasicInfos) {
    }

}
