package com.banjjog.domain.user.api;

import com.banjjog.domain.user.domain.Users;
import com.banjjog.domain.user.dto.UserCreateRequestDto;
import com.banjjog.domain.user.dto.UserCreateResuestDto;
import com.banjjog.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/exist")
    @Operation(summary = "유저가 존재 하는지 조회",description = "만약 존재한다면 userId 값 반환 없다면 0 반환 즉 0이면 유저가 존재하지 않는 것")
    Integer isExistUser (@RequestBody UserCreateRequestDto dto){
        return userService.isExistUser(dto);
    }


    @PostMapping("")
    @Operation(summary = "유저에 대한 정보 생성", description = "생성 후 userId 추가로 반환")
    UserCreateResuestDto CreateUser(@RequestBody UserCreateRequestDto dto){
        log.info("회원가입 dto : {} {}",dto.getMyName(), dto.getYourName());
        return userService.createUser(dto);
    }

    @GetMapping("/count")
    @Operation(summary = "유저 수 반환")
    Integer countUser(){ return userService.countUser();}
}
