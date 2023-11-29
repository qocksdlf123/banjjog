package com.banjjog.domain.user.api;

import com.banjjog.domain.user.domain.Users;
import com.banjjog.domain.user.dto.UserCreateRequestDto;
import com.banjjog.domain.user.dto.UserCreateResuestDto;
import com.banjjog.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("")
    Integer isExistUser (UserCreateRequestDto dto){
        return userService.isExistUser(dto);
    }


    @PostMapping("")
    UserCreateResuestDto CreateUser(UserCreateRequestDto dto){
        return userService.createUser(dto);
    }

}
