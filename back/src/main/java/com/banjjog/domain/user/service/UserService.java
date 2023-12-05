package com.banjjog.domain.user.service;

import com.banjjog.domain.user.dto.UserCreateReqDto;
import com.banjjog.domain.user.dto.UserCreateResDto;

public interface UserService {
    UserCreateResDto createUser(UserCreateReqDto dto);

    Integer isExistUser(UserCreateReqDto dto);

    Integer countUser();
}
