package com.banjjog.domain.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserCreateResDto {
    Integer userId;

    String myName;

    String yourName;
}
