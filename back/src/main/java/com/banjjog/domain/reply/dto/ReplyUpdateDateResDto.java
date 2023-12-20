package com.banjjog.domain.reply.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@Builder
public class ReplyUpdateDateResDto {
    Integer type;

    LocalDateTime time;
}
