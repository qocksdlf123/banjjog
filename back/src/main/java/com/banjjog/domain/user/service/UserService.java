package com.banjjog.domain.user.service;

import com.banjjog.domain.user.domain.Users;
import com.banjjog.domain.user.dto.UserCreateRequestDto;
import com.banjjog.domain.user.dto.UserCreateResuestDto;

public interface UserService {
    UserCreateResuestDto createUser(UserCreateRequestDto dto);

    Integer isExistUser(UserCreateRequestDto dto);
}
