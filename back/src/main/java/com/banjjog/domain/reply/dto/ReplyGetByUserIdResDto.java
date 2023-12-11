package com.banjjog.domain.reply.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReplyGetByUserIdResDto {
    Integer userId;

    Integer replyId;

    Integer day;

    String myReply;

    String predictedReply;

    String text;

}
