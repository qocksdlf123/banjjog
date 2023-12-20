package com.banjjog.domain.reply.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@Builder
public class ReplyUpdateDateReqDto {
    Integer userId;

    Integer day;

    Integer type;

    LocalDateTime time;
}
