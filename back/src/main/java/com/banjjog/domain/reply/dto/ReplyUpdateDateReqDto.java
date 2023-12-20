package com.banjjog.domain.reply.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@Builder
public class ReplyUpdateDateReqDto {
    Integer replyId;

    Integer type;

    LocalDateTime time;
}
