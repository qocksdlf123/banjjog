package com.banjjog.domain.user.service;

import com.banjjog.domain.user.dao.UserRepository;
import com.banjjog.domain.user.domain.Users;
import com.banjjog.domain.user.dto.UserCreateRequestDto;
import com.banjjog.domain.user.dto.UserCreateResuestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserCreateResuestDto createUser(UserCreateRequestDto dto) {

        Users user = Users.builder().
                        myName(dto.getMyName()).
                        yourName(dto.getYourName()).
                        build();
        userRepository.save(user);
        log.info("유저 회원가입 : {}",user);
        return UserCreateResuestDto.builder().
                userId(user.getUserId()).
                myName(user.getMyName()).
                yourName(user.getYourName()).
                build();
    }

    @Override
    public Integer isExistUser(UserCreateRequestDto dto) {
        Users existUser = userRepository.isExistUser(dto.getMyName(), dto.getYourName());
        log.info("");
        if(existUser == null) return 0;

        return existUser.getUserId();
    }

    @Override
    public Integer countUser() {
        return userRepository.countUsers();
    }


}
